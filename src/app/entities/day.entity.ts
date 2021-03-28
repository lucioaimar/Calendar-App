import * as moment from 'moment';

export interface Day {
  date: Date;
  selected?: boolean;
  today?: boolean;
  isWeekend?:boolean;
  outOfMonth: boolean;
}
