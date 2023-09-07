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
import FullScreenInput from './components/FullScreenInput';
import Maximize from '../../assets/icons/arrows/Maximize';
import EditTitleModal from './components/EditTitleModal';
import deleteChatEmittter, {
  EVENTS,
} from '../../services/events/DeletChatEmitter';
import {deleteChat} from '../../api/chats';

interface Message {
  author: string;
  chatId: string;
  content: string;
  createdAt: string;
  id: string;
  parentId: string;
}

type Props = NativeStackScreenProps<RootStackParamList, 'Chat'>;

const token =
  'qLQ%2BsULlQWoy2alieos%2F8lwxGV%2F499scANbHvelAGprpKskoMDXbiAl5sTEyWnKWxwSk61CuTnnxmVPwGBChIyFO7RsRAmMIQIwGK2IS8pexN9OFK%2Bkkis5YD9IVBjh1nw%3D%3D';

const Chat: FC<Props> = ({navigation}) => {
  const inputRef = useRef<TextInput>(null);

  const [chatTitle, setChatTitle] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inputHeight, setInputHeight] = useState<number>();
  const [lastMessage, setLastMessage] = useState<Message>();
  const [isLoading, setIsLoading] = useState(false);
  const [webSocket, setWebSocket] = useState<WebSocket>();

  const [chatMessage, setChatMessage] = useState('');
  const [isChatStarted, setIsChatStarted] = useState(false);
  const [chat, setChat] = useState<Message[]>([]);

  const isButtonDesable = useMemo(
    () => !chatMessage?.length && !isLoading,
    [chatMessage, isLoading],
  );
  const buttonStyle = useMemo(
    () => ({
      ...styles.arrowUpContainer,
      backgroundColor:
        isButtonDesable && !isLoading
          ? 'rgba(61, 63, 63, 0.655)'
          : 'rgb(180, 190, 242)',
    }),
    [isButtonDesable, isLoading],
  );
  const isOpenModalVisible = useMemo(
    () => inputHeight && inputHeight > 70,
    [inputHeight],
  );
  const lastMessageId = useMemo(() => chat.at(-1)?.id || '', [chat]);
  const chatId = useMemo(() => chat[1]?.chatId || undefined, [chat]);
  const fullChat = useMemo<Message[]>(
    () => (lastMessage ? ([...chat, lastMessage] as Message[]) : chat),
    [chat, lastMessage],
  );

  const changeTitle = useCallback(
    (newTitle: string) => {
      setChatTitle(newTitle);
      navigation.setOptions({title: newTitle});
    },
    [navigation],
  );

  const excludeChat = useCallback((chatId: string) => {
    try {
      deleteChat(chatId);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const stopWebSocket = useCallback(() => {
    webSocket?.send(
      JSON.stringify({
        close: true,
      }),
    );
  }, [webSocket]);

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
          return changeTitle(message.title);
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
      changeTitle,
      chatMessage,
      increaseChatNewMessages,
      userMessageFactory,
    ],
  );

  const newMessageWebSocket = useCallback(() => {
    if (!lastMessageId || !chatMessage) {
      return;
    }

    setIsLoading(true);

    //todo: create storage for anonymous_user_id

    const messageWebSocket = new WebSocket(
      `${process.env.GPT_API}/chats/${chatId}/messages/ws/?anonymous_user_id=AU-ABC123`,
    );

    messageWebSocket.onopen = () => {
      messageWebSocket.send(
        JSON.stringify({
          parentId: lastMessageId,
          message: chatMessage,
        }),
      );
    };

    messageWebSocket.onmessage = handleWebsockerMessage;

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
  }, [
    chatId,
    chatMessage,
    handleWebsockerMessage,
    lastMessageId,
    setLastMessage,
  ]);

  const newChatWebSocket = useCallback(() => {
    if (!chatMessage) {
      return;
    }

    setIsLoading(true);

    const messageWebSocket = new WebSocket(
      `${process.env.GPT_API}/chats-ws/?token=${token}`,
    );

    messageWebSocket.onopen = () => {
      messageWebSocket.send(
        JSON.stringify({
          message: chatMessage,
        }),
      );
    };

    messageWebSocket.onmessage = handleWebsockerMessage;

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

  useEffect(() => {
    deleteChatEmittter.on(EVENTS.deletChat, excludeChat);

    return () => {
      deleteChatEmittter.off(EVENTS.deletChat);
    };
  }, [excludeChat]);

  return (
    <View style={styles.container}>
      <FullScreenInput
        isModalVisible={isModalVisible}
        onChangeText={setChatMessage}
        text={chatMessage}
        onPress={sendMessageAndCleanInput}
        closeInput={() => setIsModalVisible(false)}
      />

      <EditTitleModal
        title={chatTitle}
        chatId={chatId}
        setTitle={changeTitle}
      />

      {!chat.length ? (
        <View style={styles.iconContainer}>
          <WelcomeAnimation text={['Snack Prompt ']} disableBackgroung />
        </View>
      ) : (
        <MessagesList messages={fullChat} />
      )}

      <View style={styles.footer}>
        <View style={[styles.inputArea, {height: inputHeight}]}>
          <VoiceTranscriber messageSetter={setChatMessage} />

          <TextInput
            multiline={true}
            onContentSizeChange={event => {
              setInputHeight(event.nativeEvent.contentSize.height);
            }}
            ref={inputRef}
            style={styles.inputText}
            placeholder="Message"
            placeholderTextColor="#ffffffcc"
            value={chatMessage}
            onChangeText={setChatMessage}
          />
        </View>

        <View style={styles.inputButtonsContainerr}>
          {isOpenModalVisible && (
            <TouchableOpacity onPress={() => setIsModalVisible(true)}>
              <Maximize width={22} height={22} color={'#ffffffcc'} />
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={buttonStyle}
            onPress={isLoading ? () => stopWebSocket : sendMessageAndCleanInput}
            disabled={isButtonDesable}>
            {isLoading ? (
              <View style={styles.square} />
            ) : (
              <ArrowUp width={24} height={24} color={'#ffffffcc'} />
            )}
          </TouchableOpacity>
        </View>
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
    flex: 1,
    color: '#ffffff99',
    fontSize: 16,
    marginLeft: 10,
    paddingRight: 5,
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
    backgroundColor: 'rgb(180, 190, 242)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    marginTop: 10,
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  square: {
    width: 15,
    height: 15,
    backgroundColor: '#ffffffcc',
  },
  inputButtonsContainerr: {
    alignItems: 'center',
  },
});

export default Chat;
