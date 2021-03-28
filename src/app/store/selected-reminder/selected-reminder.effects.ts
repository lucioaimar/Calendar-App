import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';

import * as SelectedReminderActions from './selected-reminder.actions';

import { switchMap } from 'rxjs/operators';
import { SelectedReminderAction } from './selected-reminder.actions';
import { Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddReminderFormComponent } from 'src/app/components/add-reminder-form/add-reminder-form.component';
import { ReminderDetailComponent } from 'src/app/components/reminder-detail/reminder-detail.component';
import { Action } from '@ngrx/store';

@Injectable()
export class SelectedReminderEffects {
  constructor(private actions$: Actions, private dialog: MatDialog) {}

  selectReminder$ = createEffect(() =>
    this.actions$.pipe(
      ofType<SelectedReminderAction>(SelectedReminderActions.SELECT_REMINDER),
      switchMap((action) => {
        let dialogRef = this.dialog.open(ReminderDetailComponent, {
          data: action.payload.id,
        });
        dialogRef.afterClosed().subscribe((result) => {});

        return of({});
      })
    ),
    { dispatch: false }
  );

  selectReminderEdit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType<SelectedReminderAction>(SelectedReminderActions.EDIT_REMINDER),
        switchMap((action) => {
          let dialogRef = this.dialog.open(AddReminderFormComponent, {
            data: action.payload,
          });
          dialogRef.afterClosed().subscribe((result) => {});

          return of({});
        })
      ),
    { dispatch: false }
  );
}
