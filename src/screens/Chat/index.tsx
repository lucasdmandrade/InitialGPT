import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ArrowUp from '../../assets/icons/arrows/ArrowUp';
import MessagesList from './components/MessagesList';
import VoiceTranscriber from './components/VoiceTranscriber';
import WelcomeAnimation from './components/WelcomeAnimation';
import {RootStackParamList} from '../../services/navigation';

interface Message {
  author: string;
  chatId: string;
  content: string;
  createdAt: string;
  id: string;
  parentId: string;
}

type Props = NativeStackScreenProps<RootStackParamList, 'Chat'>;

const Chat: FC<Props> = ({navigation}) => {
  const inputRef = useRef<TextInput>(null);
  const [lastMessage, setLastMessage] = useState<Message>();

  const [chatMessage, setChatMessage] = useState('');
  const [isChatStarted, setIsChatStarted] = useState(false);
  const [chat, setChat] = useState<Message[]>([]);

  const lastMessageId = useMemo(() => chat.at(-1)?.id || '', [chat]);
  const chatId = useMemo(() => chat[1]?.chatId || undefined, [chat]);
  const fullChat = useMemo<Message[]>(
    () => (lastMessage ? ([...chat, lastMessage] as Message[]) : chat),
    [chat, lastMessage],
  );

  const userMessageFactory = useCallback(
    (message: string) => {
      return {
        author: 'user',
        chatId,
        content: message,
      } as Message;
    },
    [chatId],
  );

  const assistantMessageFactory = useCallback(
    (message: string) => {
      return {
        author: 'assistant',
        chatId,
        content: message,
      } as Message;
    },
    [chatId],
  );

  const increaseChatNewMessages = useCallback(
    (newMessages: Message[]) => {
      const newChat = chat.map(message => message);

      newChat.push(...newMessages);

      setChat(newChat);
    },
    [chat],
  );

  const handleWebsockerMessage = useCallback(
    (e: WebSocketMessageEvent) => {
      try {
        const message = JSON.parse(e.data);

        if (message?.title) {
          return navigation.setOptions({title: message.title});
        }

        setLastMessage(undefined);

        increaseChatNewMessages([userMessageFactory(chatMessage), message]);

        setIsChatStarted(true);
      } catch {
        const message = userMessageFactory(e.data);

        setLastMessage(assistantMessageFactory(message.content));
      }
    },
    [
      assistantMessageFactory,
      chatMessage,
      increaseChatNewMessages,
      navigation,
      userMessageFactory,
    ],
  );

  const newMessageWebSocket = useCallback(() => {
    if (!lastMessageId || !chatMessage) {
      return;
    }

    //todo: create storage for anonymous_user_id

    const messageWebSocket = new WebSocket(
      `wss://api-chatgpt-dev.snackprompt.com/chats/${chatId}/messages/ws/?anonymous_user_id=AU-ABC123`,
    );

    messageWebSocket.onopen = () => {
      messageWebSocket.send(
        JSON.stringify({
          parent_id: lastMessageId,
          message: chatMessage,
        }),
      );
    };

    messageWebSocket.onmessage = handleWebsockerMessage;

    // messageWebSocket.onerror = error => {
    //   console.error('WebSocket error:', error);
    // };

    // messageWebSocket.onclose = event => {
    //   console.log('WebSocket closed:', event);
    // }

    return () => {
      if (messageWebSocket) {
        messageWebSocket.close();
      }
    };
  }, [chatId, chatMessage, handleWebsockerMessage, lastMessageId]);

  const newChatWebSocket = useCallback(() => {
    if (!chatMessage) {
      return;
    }

    const messageWebSocket = new WebSocket(
      'wss://api-chatgpt-dev.snackprompt.com/chats-ws/?anonymous_user_id=AU-ABC123',
    );

    messageWebSocket.onopen = () => {
      messageWebSocket.send(
        JSON.stringify({
          message: chatMessage,
        }),
      );
    };

    messageWebSocket.onmessage = handleWebsockerMessage;

    // messageWebSocket.onerror = error => {
    //   console.error('WebSocket error:', error);
    // };

    // messageWebSocket.onclose = event => {
    //   console.log('WebSocket closed:', event);
    // };

    return () => {
      if (messageWebSocket) {
        messageWebSocket.close();
      }
    };
  }, [chatMessage, handleWebsockerMessage]);

  const messageSender = useCallback(
    async () =>
      isChatStarted ? await newMessageWebSocket() : await newChatWebSocket(),
    [isChatStarted, newChatWebSocket, newMessageWebSocket],
  );

  const sendMessageAndCleanInput = useCallback(async () => {
    increaseChatNewMessages([userMessageFactory(chatMessage)]);
    await messageSender();

    setChatMessage('');
  }, [chatMessage, messageSender, increaseChatNewMessages, userMessageFactory]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <View style={styles.container}>
      {!chat.length ? (
        <View style={styles.iconContainer}>
          <WelcomeAnimation />
        </View>
      ) : (
        <MessagesList messages={fullChat} />
      )}

      <View style={styles.footer}>
        <View style={styles.inputArea}>
          <VoiceTranscriber messageSetter={setChatMessage} />

          <TextInput
            ref={inputRef}
            style={styles.inputText}
            placeholder="Message"
            placeholderTextColor="#ffffffcc"
            value={chatMessage}
            onChangeText={setChatMessage}
          />
        </View>

        <TouchableOpacity
          style={styles.arrowUpContainer}
          onPress={sendMessageAndCleanInput}>
          <ArrowUp width={24} height={24} color={'#ffffff4c'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191a20',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 15,
    paddingBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputText: {
    color: '#ffffff99',
    fontSize: 16,
    marginLeft: 10,
    marginRight: 15,
    width: '100%',
  },
  inputArea: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#2d2f39',
    height: 50,
    borderRadius: 50,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginRight: 10,
  },
  arrowUpContainer: {
    width: 38,
    height: 38,
    backgroundColor: 'rgba(61, 63, 63, 0.655)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Chat;
