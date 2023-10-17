import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import MessagesList from './components/MessagesList';
import WelcomeAnimation from './components/WelcomeAnimation';
import {RootStackParamList} from '../../services/navigation';
import FullScreenInput from './components/FullScreenInput';
import EditTitleModal from './components/EditTitleModal';
import deleteChatEmittter, {
  EVENTS,
} from '../../services/events/DeletChatEmitter';
import {deleteChat, getChatMessages} from '../../api/chats';
import {getUserToken} from '../../services/storages/auth';
import Footer from './components/Footer';
import regenerateMessageEmitter, {
  EVENTS as REGENERATE_EVENTS,
} from '../../services/events/RegenerateMessageEmitter';
import colors from '../../styles/Colors';
import {
  newChatWebSocket,
  newMessageWebSocket,
  regenerateMessage,
  stopWebSocket,
} from '../../api/chatWebsocket';
import getChatEmittter, {
  EVENTS as GET_EVENT,
} from '../../services/events/GetChatEmitter';

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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isChatStarted, setIsChatStarted] = useState(false);
  const [userToken, setUserToken] = useState('');
  const [chatTitle, setChatTitle] = useState('');
  const [lastMessage, setLastMessage] = useState<Message>();
  const [webSocket, setWebSocket] = useState<WebSocket>();

  const [chatMessage, setChatMessage] = useState('');
  const [chat, setChat] = useState<Message[]>([]);

  const lastMessageId = useMemo(() => chat.at(-1)?.id || '', [chat]);
  const chatId = useMemo(() => chat[1]?.chatId || undefined, [chat]);
  const fullChat = useMemo<Message[]>(
    () => (lastMessage ? ([...chat, lastMessage] as Message[]) : chat),
    [chat, lastMessage],
  );

  const getToken = useCallback(async () => {
    const user = await getUserToken();

    if (user) {
      setUserToken(user);
    }
  }, []);

  const changeTitle = useCallback(
    (newTitle: string) => {
      setChatTitle(newTitle);
      navigation.setOptions({title: newTitle});
    },
    [navigation],
  );

  const excludeChat = useCallback(() => {
    try {
      deleteChat(chatId as string);
    } catch (e) {
      console.log(e);
    } finally {
      navigation.reset({
        index: 0,
        routes: [{name: 'Chat'}],
      });
    }
  }, [chatId, navigation]);

  const getChat = useCallback(async (id: string) => {
    const reclaimedMessages = await getChatMessages(id);

    setIsChatStarted(true);

    setChat(reclaimedMessages);
  }, []);

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

  const increaseChatNewMessages = useCallback(
    (newMessages: Message[]) => {
      const newChat = chat.map(message => message);

      newChat.push(...newMessages);

      setChat(newChat);
    },
    [chat],
  );

  const messageSender = useCallback(
    () =>
      isChatStarted
        ? newMessageWebSocket(
            chatId as string,
            userToken,
            lastMessageId,
            chatMessage,
            chat,
            setChat,
            setLastMessage,
            setIsChatStarted,
            setWebSocket,
            changeTitle,
            setIsLoading,
          )
        : newChatWebSocket(
            chatId as string,
            userToken,
            chatMessage,
            chat,
            setChat,
            setLastMessage,
            setIsChatStarted,
            setWebSocket,
            changeTitle,
            setIsLoading,
          ),
    [
      changeTitle,
      chat,
      chatId,
      chatMessage,
      isChatStarted,
      lastMessageId,
      userToken,
    ],
  );

  const sendMessageAndCleanInput = useCallback(() => {
    increaseChatNewMessages([userMessageFactory(chatMessage)]);
    messageSender();

    setChatMessage('');
  }, [chatMessage, messageSender, increaseChatNewMessages, userMessageFactory]);

  useEffect(() => {
    deleteChatEmittter.on(EVENTS.deletChat, excludeChat);

    getChatEmittter.on(GET_EVENT.getChat, getChat);

    regenerateMessageEmitter.on(
      REGENERATE_EVENTS.regenerateMessage,
      messageId =>
        regenerateMessage(
          messageId,
          chat,
          chatId as string,
          userToken as string,
          setChat,
          setIsLoading,
        ),
    );

    return () => {
      deleteChatEmittter.off(EVENTS.deletChat);
      getChatEmittter.off(GET_EVENT.getChat);
      regenerateMessageEmitter.off(REGENERATE_EVENTS.regenerateMessage);
    };
  }, [chat, chatId, excludeChat, getChat, userToken]);

  useEffect(() => {
    getToken();
  }, [getToken]);

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
          <WelcomeAnimation text={['Snack Prompt ']} disableBackground />
        </View>
      ) : (
        <MessagesList messages={fullChat} />
      )}

      <Footer
        action={
          isLoading ? () => stopWebSocket(webSocket) : sendMessageAndCleanInput
        }
        messageHandler={{
          chatMessage: chatMessage,
          setChatMessage: setChatMessage,
        }}
        messageSetter={setChatMessage}
        showModal={() => setIsModalVisible(true)}
        isLoading={isLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark.background,
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 15,
    paddingBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});

export default Chat;
