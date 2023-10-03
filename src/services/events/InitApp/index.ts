import {EventEmitter} from 'eventemitter3';

const initAppEmittter = new EventEmitter();

export enum EVENTS {
  initApp = 'Init_App',
}

export default initAppEmittter;
