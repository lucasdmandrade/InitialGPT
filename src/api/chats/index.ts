import gptApi from '../../services/axios/gptApi';
import {getUserToken} from '../../services/storages/auth';

export const getChats = async () => {
  const token = await getUserToken();

  const chatsResponse = await gptApi.get('/chats', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return chatsResponse.data.response;
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
  return await gptApi.patch(`/chats/${id}/?anonymous_user_id=AU-ABC123`, {
    title,
  });
};

export const deleteChat = async (id: string) => {
  return await gptApi.delete(`/chats/${id}/?anonymous_user_id=AU-ABC123`);
};
