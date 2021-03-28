import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Weather } from 'src/app/entities/weather.entity';
import { WeatherService } from 'src/app/services/weather.service';
import { AppState } from 'src/app/store/app.reducer';
import { Reminder } from 'src/app/store/reminder/reminder.model';
import { environment } from 'src/environments/environment';
import * as SelectedReminderActions from '../../store/selected-reminder/selected-reminder.actions';
import * as ReminderActions from '../../store/reminder/reminder.actions';

@Component({
  selector: 'app-reminder-detail',
  templateUrl: './reminder-detail.component.html',
  styleUrls: ['./reminder-detail.component.scss'],
})
export class ReminderDetailComponent implements OnInit {
  reminder$: Observable<Reminder>;
  weather: Weather;

  constructor(
    public dialogRef: MatDialogRef<ReminderDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store<AppState>,
    private weatherService: WeatherService
  ) {}

  ngOnInit() {
    this.reminder$ = this.store.select('selectedReminder');
    this.reminder$.subscribe((reminder) => {
      if(reminder.city){
        this.weatherService
        .GetWeatherByCity(reminder.city)
        .subscribe((weather) => {
          this.weather = weather;
        });
      }
    });
  }

  edit(reminder: Reminder) {
    this.store.dispatch(
      new SelectedReminderActions.EditReminderAction(reminder)
    );
    this.dialogRef.close();
  }

  KToC(kelvin: number): number
  {
    return Math.round(kelvin - 273.15);
  }

  close() {
    this.dialogRef.close();
  }

  delete(reminder: Reminder) {
    this.store.dispatch(
      new ReminderActions.DeleteReminderAction(reminder.id)
    );
    this.dialogRef.close();
  }

  deleteAll(reminder: Reminder) {
    this.store.dispatch(
      new ReminderActions.RemoveRemindersByDayAction(reminder.date)
    );
    this.dialogRef.close();
  }

  getIconUrl(icon: string): string {
    return `${environment.iconUrl}${icon}@2x.png`;
  }

}
