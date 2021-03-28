import { createSelector } from '@ngrx/store';
import { UtilFunctionsService } from 'src/app/helpers/utils.functions';
import { AppState } from '../app.reducer';
import { Reminder } from './reminder.model';

export const getState  = (state: AppState) => state;

//GET ALL
export const getReminders  = (state: AppState) => state.reminders;


export const getRemindersById = createSelector(getReminders, (reminders:Reminder[],props) => {
  let results= reminders.filter(reminder => reminder.id===props.id);
  if(results.length>0)return results[0];
});

export const getRemindersByDate = createSelector(getReminders, (reminders:Reminder[],props) => {
  return reminders.filter(reminder => UtilFunctionsService.isSameDay(reminder.date, props.date)).sort((a,b)=>{
   return (a.date.getTime() - b.date.getTime())
  });
});
