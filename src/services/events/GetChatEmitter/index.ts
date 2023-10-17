import {EventEmitter} from 'eventemitter3';

const getChatEmittter = new EventEmitter();

export enum EVENTS {
  getChat = 'Get_Chat',
}

export default getChatEmittter;
