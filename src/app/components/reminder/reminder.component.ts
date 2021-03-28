import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { Reminder } from 'src/app/store/reminder/reminder.model';
import * as SelectedReminderActions from '../../store/selected-reminder/selected-reminder.actions';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss'],
})
export class ReminderComponent implements OnInit {
  @Input() reminder: Reminder;
  constructor(private dialog: MatDialog, private store: Store<AppState>) {}

  ngOnInit() {}

  showReminderDetail() {
    this.store.dispatch(
      new SelectedReminderActions.SelectedReminderAction(this.reminder)
    );
  }

}
