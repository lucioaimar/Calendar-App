import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Day } from 'src/app/entities/day.entity';
import { AppState } from 'src/app/store/app.reducer';
import { Reminder } from 'src/app/store/reminder/reminder.model';
import { getRemindersByDate } from 'src/app/store/reminder/reminder.selectors';
import { AddReminderFormComponent } from '../add-reminder-form/add-reminder-form.component';
import * as ReminderActions from '../../store/reminder/reminder.actions';
import { ReminderListComponent } from '../reminder-list/reminder-list.component';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent implements OnInit {

  @Input() day:Day;

  reminders$:Observable<Array<Reminder>>;

  constructor(private store:Store<AppState>, private dialog: MatDialog) { }

  ngOnInit() {
    this.readRemindersState();
  }

  private readRemindersState() {
   this.reminders$=this.store.pipe(select(getRemindersByDate, { date: this.day.date }));
  }

  addReminder(date: Date) {
    let dialogRef = this.dialog.open(AddReminderFormComponent, {
      data: {date: date},
    });
    dialogRef.afterClosed().subscribe((result) => {
    });
  }

  seeMore(date: Date){
    let dialogRef = this.dialog.open(ReminderListComponent, {
      data: {date: date},
    });
    dialogRef.afterClosed().subscribe((result) => {
    });
  }

  deleteAll(date: Date) {
    this.store.dispatch(
      new ReminderActions.RemoveRemindersByDayAction(date)
    );
  }

}
