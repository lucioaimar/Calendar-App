import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddReminderFormComponent } from 'src/app/components/add-reminder-form/add-reminder-form.component';

@Component({
  selector: 'app-calendar-home',
  templateUrl: './calendar-home.component.html',
  styleUrls: ['./calendar-home.component.scss'],
})
export class CalendarHomeComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  selectedMonth: Date;

  ngOnInit() {
    this.selectedMonth = new Date;
  }

  incrementMonth(){
    this.selectedMonth = new Date(this.selectedMonth.setMonth(this.selectedMonth.getMonth() + 1))
  }

  decreaseMonth(){
    this.selectedMonth = new Date(this.selectedMonth.setMonth(this.selectedMonth.getMonth() - 1))
  }

  addReminder() {
    let dialogRef = this.dialog.open(AddReminderFormComponent, {
      data: {},
    });
    dialogRef.afterClosed().subscribe((result) => {
    });
  }
}
