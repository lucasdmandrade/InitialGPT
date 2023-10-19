import auth from '@react-native-firebase/auth';
import gptApi from '../../services/axios/gptApi';
import {getUserToken} from '../../services/storages/auth';

export const getChats = async () => {
  const token = await auth().currentUser?.getIdToken();

  try {
    const chatsResponse = await gptApi.get('/chats', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return chatsResponse.data.response;
  } catch (e) {
    console.log('getChats error: ', e);
  }
};

export const getChatMessages = async (id: string) => {
  const token = await auth().currentUser?.getIdToken();

  try {
    const chatsResponse = await gptApi.get(`/chats/${id}/messages`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return chatsResponse.data.response;
  } catch (e) {
    console.log('getChatMessages', e);
  }
};

export const newChat = async (chatMessage: string) => {
  return await gptApi.post(
    '/chats',
    {
      message: chatMessage,
    },
    {
      params: {
        anonymous_user_id: 'AU-ABC123',
      },
    },
  );
};

export const deleteChat = async (id: string) => {
  const token = await getUserToken();

  try {
    await gptApi.delete(`/chats/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (e) {
    console.log('deleteChat error: ', e);
  }
};

export const newMessage = async (chatMessage: string, id: string) => {
  return await gptApi.post(
    `/chats/?id=${id}/messages`,
    {
      message: chatMessage,
    },
    {
      params: {
        anonymous_user_id: 'AU-ABC123',
      },
    },
  );
};

export const editTitle = async (id: string, title: string) => {
  const token = await getUserToken();
  try {
    await gptApi.patch(
      `/chats/${id}`,
      {
        title,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  } catch (e) {
    console.log('editTitle error: ', e);
  }
};
