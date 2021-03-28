import {
  Color,
  NgxMatColorPickerInput,
} from '@angular-material-components/color-picker';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ErrorHandler } from 'src/app/helpers/error.handler';
import { AppState } from 'src/app/store/app.reducer';
import { Reminder } from 'src/app/store/reminder/reminder.model';
import * as ReminderActions from '../../store/reminder/reminder.actions';

@Component({
  selector: 'app-add-reminder-form',
  templateUrl: './add-reminder-form.component.html',
  styleUrls: ['./add-reminder-form.component.scss'],
})
export class AddReminderFormComponent implements OnInit {
  @ViewChild(NgxMatColorPickerInput) pickerInput: NgxMatColorPickerInput;

  id: number;

  reminderForm: FormGroup;

  errors: any = {};

  reminderToEdit:Reminder;

  dateInput: Date;
  reminder: Reminder;
  dialogTitle: string = 'New Reminder';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private errorHandler: ErrorHandler,
    public dialogRef: MatDialogRef<AddReminderFormComponent>,
    private store: Store<AppState>
  ) {
    if(data&&data.id){
      if (data.id){
        this.id=data.id;
        this.reminderToEdit=data;
      }
    }
    if(data.date){
      this.dateInput = data.date;
    }
  }

  ngOnInit(): void {
    this.reminderForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.maxLength(30),
      ]),
      date: new FormControl('', [Validators.required]),
      city: new FormControl(''),
      color: new FormControl(''),
    });
    this.errorHandler.handleErrors(this.reminderForm, this.errors);
    if(this.reminderToEdit){
      this.dialogTitle = 'Edit Reminder';

      this.reminderForm.patchValue(this.reminderToEdit);
      if (this.reminderToEdit.color){
        const rgbData = this.hexToRgb(this.reminderToEdit.color);
        this.reminderForm.patchValue({color: new Color(rgbData.r, rgbData.g, rgbData.b, 1)})
      }
    } else if (this.dateInput){
      this.reminderForm.patchValue({date: this.dateInput});
    }
  }

  save() {
    let isNew: boolean = false;
    if (!this.id) {
      //Adding an id to check, this could be in the localStorage if you want it to still be here after refreshing page
      this.id = Math.random();
      isNew = true;
    }


    this.reminder = {
      id: this.id,
      title: this.reminderForm.value.title,
      date: this.reminderForm.value.date,
      color: this.reminderForm.value.color ? '#'+this.reminderForm.value.color.hex : '',
      city: this.reminderForm.value.city,
    };

    if(isNew){
      const action = new ReminderActions.AddReminderAction(
        this.reminder
      );
      this.store.dispatch(action);
    }else{
      const action = new ReminderActions.UpdateAction(
        this.reminder
      );
      this.store.dispatch(action);
    }
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }

  hexToRgb(hex) {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => {
      return r + r + g + g + b + b;
    });
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }

  get title() {
    return this.reminderForm.get('title');
  }

  get date() {
    return this.reminderForm.get('date');
  }

  get time() {
    return this.reminderForm.get('time');
  }

  get city() {
    return this.reminderForm.get('city');
  }
}
