import {EventEmitter} from 'eventemitter3';

const deleteChatEmittter = new EventEmitter();

export enum EVENTS {
  deletChat = 'Delet_Chat',
}

export default deleteChatEmittter;
