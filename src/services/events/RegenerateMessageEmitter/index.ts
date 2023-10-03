import {EventEmitter} from 'eventemitter3';

const regenerateMessageEmitter = new EventEmitter();

export enum EVENTS {
  regenerateMessage = 'Regenerate_Message',
}

export default regenerateMessageEmitter;
