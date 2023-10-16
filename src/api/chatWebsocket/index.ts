import {Message} from '../models/chats';

export const stopWebSocket = (webSocket: any) => {
  webSocket?.send(
    JSON.stringify({
      close: true,
    }),
  );
};

const userMessageFactory = (message: string, chatId: string) => {
  return {
    author: 'user',
    chatId,
    content: message,
  } as Message;
};

const assistantMessageFactory = (message: string, chatId: string) => {
  return {
    author: 'assistant',
    chatId,
    content: message,
  } as Message;
};

const increaseChatNewMessages = (
  newMessages: Message[],
  chat: Message[],
  setChat: (value: Message[]) => void,
) => {
  const newChat = chat.map(message => message);

  newChat.push(...newMessages);

  setChat(newChat);
};

const changeChatMessage = (
  newMessage: Message,
  chat: Message[],
  messageId: string,
  setChat: (value: Message[]) => void,
) => {
  const newChat = chat.map(message => message);

  const changedMessagePosition = newChat.findIndex(
    message => message.id === messageId,
  );

  newChat[changedMessagePosition] = newMessage;

  setChat(newChat);
};

export const newMessageWebSocket = (
  chatId: string,
  userToken: string,
  lastMessageId: string,
  chatMessage: string,
  chat: Message[],
  setChat: (value: Message[]) => void,
  setLastMessage: (value?: Message) => void,
  setIsChatStarted: (value: boolean) => void,
  setWebSocket: (value?: WebSocket) => void,
  changeTitle: (newTitle: string) => void,
  setIsLoading: (value: boolean) => void,
) => {
  if (!lastMessageId || !chatMessage) {
    return;
  }

  setIsLoading(true);

  const messageWebSocket = new WebSocket(
    `${process.env.GPT_API}/chats/${chatId}/messages/ws/?token=${userToken}`,
  );

  messageWebSocket.onopen = () => {
    messageWebSocket.send(
      JSON.stringify({
        parentId: lastMessageId,
        message: chatMessage,
      }),
    );
  };

  messageWebSocket.onmessage = e => {
    try {
      const message = JSON.parse(e.data);

      if (message?.title) {
        return changeTitle(message.title);
      }

      setLastMessage(undefined);

      increaseChatNewMessages(
        [userMessageFactory(chatMessage, chatId), message],
        chat,
        setChat,
      );

      setIsChatStarted(true);
    } catch {
      const message = userMessageFactory(e.data, chatId);

      setLastMessage(assistantMessageFactory(message.content, chatId));
    }
  };

  // messageWebSocket.onerror = error => {
  //   console.error('WebSocket error:', error);
  // };

  messageWebSocket.onclose = () => {
    setLastMessage(undefined);

    setIsLoading(false);
  };

  setWebSocket(messageWebSocket);

  return () => {
    if (messageWebSocket) {
      messageWebSocket.close();
    }
  };
};

export const newChatWebSocket = (
  chatId: string,
  userToken: string,
  chatMessage: string,
  chat: Message[],
  setChat: (value: Message[]) => void,
  setLastMessage: (value?: Message) => void,
  setIsChatStarted: (value: boolean) => void,
  setWebSocket: (value: WebSocket) => void,
  changeTitle: (value: string) => void,
  setIsLoading: (value: boolean) => void,
) => {
  if (!chatMessage) {
    return;
  }

  setIsLoading(true);

  const messageWebSocket = new WebSocket(
    `${process.env.GPT_API}/chats-ws/?token=${userToken}`,
  );

  messageWebSocket.onopen = () => {
    messageWebSocket.send(
      JSON.stringify({
        message: chatMessage,
      }),
    );
  };

  messageWebSocket.onmessage = e => {
    try {
      const message = JSON.parse(e.data);

      if (message?.title) {
        return changeTitle(message.title);
      }

      setLastMessage(undefined);

      increaseChatNewMessages(
        [userMessageFactory(chatMessage, chatId), message],
        chat,
        setChat,
      );

      setIsChatStarted(true);
    } catch {
      const message = userMessageFactory(e.data, chatId);

      setLastMessage(assistantMessageFactory(message.content, chatId));
    }
  };

  messageWebSocket.onerror = error => {
    console.error('WebSocket error:', error);
  };

  messageWebSocket.onclose = () => {
    setIsLoading(false);
  };

  setWebSocket(messageWebSocket);

  return () => {
    if (messageWebSocket) {
      messageWebSocket.close();
    }
  };
};

export const regenerateMessage = (
  messageId: string,
  chat: Message[],
  chatId: string,
  userToken: string,
  setChat: (value: Message[]) => void,
  setIsLoading: (value: boolean) => void,
) => {
  setIsLoading(true);

  const messageWebSocket = new WebSocket(
    `${process.env.GPT_API}/chats/${chatId}/messages/${messageId}/ws/?token=${userToken}`,
  );

  messageWebSocket.onmessage = e => {
    try {
      const message = JSON.parse(e.data);

      changeChatMessage(message, chat, messageId, setChat);
    } catch {
      const message = assistantMessageFactory(e.data, chatId);

      changeChatMessage(message, chat, messageId, setChat);
    }
  };

  messageWebSocket.onerror = error => {
    console.error('WebSocket error:', error);
  };

  messageWebSocket.onclose = () => {
    setIsLoading(false);
  };

  return () => {
    if (messageWebSocket) {
      messageWebSocket.close();
    }
  };
};
