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

export const messageStream = (id: string) => {
  return new WebSocket(`/chats/?id=${id}/messages`);
};
