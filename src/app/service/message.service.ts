import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

export const MSG_ACTION_SELECT_BACKLOG_ITEM = 'select_backlog_item';
export const MSG_ACTION_SELECT_SUBTASK = 'select_subtask_select';
export const MSG_ACTION_UPSERT_ALLOCATION = 'upsert_allocation';
export const MSG_ACTION_REMOVE_ALLOCATION = 'remove_allocation';
export const MSG_ACTION_REFRESH = 'refresh';
export const MSG_ACTION_SELECT_ALLOCATION = 'select_allocation';
export const MSG_PARAM_ALLOCATION = 'allocation';
export const MSG_PARAM_EMPLOYEE = 'employee';

export class Message {
  action: string;
  params: object;

  constructor(action: string, params: object) {
    this.action = action;
    this.params = params;
  }
}

@Injectable()
export class MessageService {
  private subject = new Subject<any>();

  sendMessage(msg: Message) {
    console.log('Messaging (action: ' + msg.action + ', params:' + JSON.stringify(msg.params) + ')');
    this.subject.next(msg);
  }

  clearMessage() {
    this.subject.next();
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
