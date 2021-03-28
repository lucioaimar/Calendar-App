import { Reminder } from './reminder.model';
import * as ReminderActions from './reminder.actions';
import { UtilFunctionsService } from 'src/app/helpers/utils.functions';

const localStorageKey = 'reminders'

const initialState: Array<Reminder> = [];

export function ReminderReducer(state: Array<Reminder> = initialState, action: ReminderActions.ReminderActionType) {
  switch (action.type) {
    case ReminderActions.ADD_REMINDER: {
      return [
        ...state,
       action.payload
      ];
    }
    case ReminderActions.DELETE_REMINDER: {
      return state.filter(reminder => action.id !== reminder.id );
    }
    case ReminderActions.REMOVE_BY_DAY_REMINDER: {
      return state.filter(reminder => !UtilFunctionsService.isSameDay(action.date, reminder.date) );
    }
    case ReminderActions.UPDATE_REMINDER: {
      return state.map(reminder => {
        if (action.payload.id === reminder.id) {
          return {
            ...reminder,
            ...action.payload
          };
        }else {
          return reminder;
        }
      });
    }

    default: {
      return state;
    }
  }
}
