import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import './helpers/utils.functions'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarHomeComponent } from './pages/calendar-home/calendar-home.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { DayComponent } from './components/day/day.component';
import { AddReminderFormComponent } from './components/add-reminder-form/add-reminder-form.component';
import { MAT_COLOR_FORMATS, NgxMatColorPickerModule, NGX_MAT_COLOR_FORMATS } from '@angular-material-components/color-picker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { environment } from '../environments/environment';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { ReminderComponent } from './components/reminder/reminder.component';
import { rootReducer } from './store/app.reducer';
import { ReminderDetailComponent } from './components/reminder-detail/reminder-detail.component';
import { SelectedReminderEffects } from './store/selected-reminder/selected-reminder.effects';
import { HttpClientModule } from '@angular/common/http';
import { ReminderListComponent } from './components/reminder-list/reminder-list.component';


@NgModule({
  declarations: [
    AppComponent,
    CalendarHomeComponent,
    CalendarComponent,
    DayComponent,
    AddReminderFormComponent,
    ReminderComponent,
    ReminderDetailComponent,
    ReminderListComponent
  ],
  entryComponents:[
    AddReminderFormComponent,
    ReminderListComponent,
    ReminderDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    NgxMatColorPickerModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    MatButtonModule,
    MatTooltipModule,
    MatDividerModule,
    MatListModule,
    StoreModule.forRoot(rootReducer),
    EffectsModule.forRoot([SelectedReminderEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25 //  Retains last 25 states
    }),
  ],
  providers: [
    { provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
