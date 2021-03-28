import { Component, Input, OnInit } from '@angular/core';
import { range } from 'lodash';
import * as moment from 'moment';
import { Day } from 'src/app/entities/day.entity';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  public daysForCalendar : Array<Day>
  public dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  weeks: Day[][] = [];
  @Input() selectedMonth: Date

  constructor() {}

  ngOnInit(): void {
    this.generateCalendar()
  }

  ngOnChanges(){
    this.generateCalendar()
  }

  isToday(date: Date): boolean {
    const today = new Date
    return date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate();
  }

  isCurrentMonth(date: Date): boolean {
    return date.getFullYear() === this.selectedMonth.getFullYear() &&
    date.getMonth() === this.selectedMonth.getMonth()
  }

  checkWeeks(days: Array<Day>): Array<Day>{
    if(!this.isCurrentMonth(days[35].date)){
      return days.splice(0, 35)
    } else {
      return days
    }
  }

  generateCalendar(): void {
    const dates = this.checkWeeks(this.getDays(this.selectedMonth));
    const weeks: Day[][] = [];

    while (dates.length > 0) {
      let week=dates.splice(0, 7)
      weeks.push(week);
    }
    this.weeks = weeks;
  }

  getDays(date : Date = new Date): Array<Day> {
    const dayInMiliseconds = 60 * 60 * 24 * 1000;
    const [year, month] = [date.getFullYear(), date.getMonth()];
    const firstDayOfMonth = new Date(year, month, 1).getTime();

    const calendarStartTime = range(1,7)
      .map(num => new Date(firstDayOfMonth - dayInMiliseconds * num))
      .find(dt => dt.getDay() === 0)

    return range(0, 42)
      .map((num: number) => {
        let date = new Date(calendarStartTime.getTime() + (dayInMiliseconds * num))
        return {
          today: this.isToday(date),
          isWeekend: date.getDay() == 0 || date.getDay()==6,
          date: date,
          outOfMonth: !this.isCurrentMonth(date)
        };
      });
  }
}
