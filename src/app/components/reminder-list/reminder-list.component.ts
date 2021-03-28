import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.reducer';
import { Reminder } from 'src/app/store/reminder/reminder.model';
import { ReminderDetailComponent } from '../reminder-detail/reminder-detail.component';
import * as ReminderActions from '../../store/reminder/reminder.actions';
import * as SelectedReminderActions from '../../store/selected-reminder/selected-reminder.actions';
import { getRemindersByDate } from 'src/app/store/reminder/reminder.selectors';


@Component({
  selector: 'app-reminder-list',
  templateUrl: './reminder-list.component.html',
  styleUrls: ['./reminder-list.component.scss']
})
export class ReminderListComponent implements OnInit {
  reminders$: Observable<Array<Reminder>>;
  date: Date;

  constructor(
    public dialogRef: MatDialogRef<ReminderDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store<AppState>,
  ) {
    if(data){
      this.date = data.date;
    }
   }

  ngOnInit(): void {
    this.reminders$=this.store.pipe(select(getRemindersByDate, { date: this.date }));
  }

  close() {
    this.dialogRef.close();
  }

  delete(reminder: Reminder) {
    this.store.dispatch(
      new ReminderActions.DeleteReminderAction(reminder.id)
    );
  }

  showReminderDetail(reminder: Reminder) {
    this.store.dispatch(
      new SelectedReminderActions.SelectedReminderAction(reminder)
    );
  }

  deleteAll(date: Date) {
    this.store.dispatch(
      new ReminderActions.RemoveRemindersByDayAction(date)
    );
    this.dialogRef.close();
  }

}
