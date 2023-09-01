import {EventEmitter} from 'eventemitter3';

const changeTitleEmitter = new EventEmitter();

export enum EVENTS {
  openModal = 'OPEN_MODAL',
}

export default changeTitleEmitter;
