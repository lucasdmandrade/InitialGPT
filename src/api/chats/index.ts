import gptApi from '../../services/axios/gptApi';

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
  console.log(id);
  return await gptApi.patch(`/chats/${id}/?anonymous_user_id=AU-ABC123`, {
    title,
  });
};

export const deleteChat = async (id: string) => {
  return await gptApi.delete(`/chats/${id}/?anonymous_user_id=AU-ABC123`);
};
