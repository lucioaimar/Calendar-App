import { Action } from '@ngrx/store';
import * as moment from 'moment';

export const ADD_REMINDER = '[REMINDER] add';
export const DELETE_REMINDER = '[REMINDER] delete';
export const UPDATE_REMINDER = '[REMINDER] update';
export const REMOVE_BY_DAY_REMINDER = '[REMINDER] remove by day';

export class AddReminderAction implements Action {
  readonly type = ADD_REMINDER;

  constructor(
    public payload: {
      id: number;
      date: Date;
      title: string;
      city: string;
      color: string;
    }
  ) {}
}

export class DeleteReminderAction implements Action {
  readonly type = DELETE_REMINDER;

  constructor(public id: number) {}
}

export class RemoveRemindersByDayAction implements Action {
  readonly type = REMOVE_BY_DAY_REMINDER;

  constructor(public date: Date) {}
}

export class UpdateAction implements Action {
  readonly type = UPDATE_REMINDER;

  constructor(
    public payload: {
      id: number;
      date: Date;
      title: string;
      city: string;
      color: string;
    }
  ) {}
}

export type ReminderActionType =
  | AddReminderAction
  | DeleteReminderAction
  | UpdateAction
  | RemoveRemindersByDayAction;
