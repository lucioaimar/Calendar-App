import { ActionReducerMap } from '@ngrx/store';

import { ReminderReducer } from './reminder/reminder.reducer';
import { Reminder } from './reminder/reminder.model';
import { SelectedReminderReducer } from './selected-reminder/selected-reminder.reducer';

export interface AppState {
  reminders: Array<Reminder>;
  selectedReminder:Reminder;
}

export const rootReducer: ActionReducerMap<AppState> = {
  reminders: ReminderReducer,
  selectedReminder:SelectedReminderReducer,
};
