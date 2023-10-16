export interface Message {
  author: string;
  chatId: string;
  content: string;
  createdAt: string;
  id: string;
  parentId: string;
}

export interface Chat {
  createdAt: string;
  id: string;
  lastUsedAt: string;
  model: string;
  title: string;
}
