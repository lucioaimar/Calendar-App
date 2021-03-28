import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store, StoreModule } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { AppState, rootReducer } from 'src/app/store/app.reducer';

import { AddReminderFormComponent } from './add-reminder-form.component';

describe('AddReminderFormComponent', () => {
  let component: AddReminderFormComponent;
  let fixture: ComponentFixture<AddReminderFormComponent>;

  beforeEach(async () => {
    const dialogMock = {
      close: () => { }
    };
    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(rootReducer),
      ],
      declarations: [ AddReminderFormComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: dialogMock  }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddReminderFormComponent);
    component = fixture.componentInstance;
    component.ngOnInit()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.reminderForm.valid).toBeFalsy();
  });

  it('title field validity', () => {
    let errors = {};
    let title = component.reminderForm.controls['title'];
    expect(title.valid).toBeFalsy();

    errors = title.errors || {};
    expect(errors['required']).toBeTruthy();

    title.setValue("testwithmorethan 30 characters ....");
    errors = title.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['maxlength']).toBeTruthy();

    title.setValue("test");
    errors = title.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['maxlength']).toBeFalsy();
  });

  it('date field validity', () => {
    let errors = {};
    let date = component.reminderForm.controls['date'];
    expect(date.valid).toBeFalsy();

    errors = date.errors || {};
    expect(errors['required']).toBeTruthy();

    date.setValue("3/16/2021, 24:00:00");
    errors = date.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('submitting a form emits a reminder', () => {
    expect(component.reminderForm.valid).toBeFalsy();
    component.reminderForm.controls['title'].setValue("test");
    component.reminderForm.controls['date'].setValue(new Date("3/16/2021, 24:00:00"));
    component.reminderForm.controls['city'].setValue("Córdoba");
    component.reminderForm.controls['color'].setValue({hex: 'ffffff'});
    expect(component.reminderForm.valid).toBeTruthy();

    component.save();

    expect(component.reminder.title).toBe("test");
    expect(component.reminder.date).toEqual(new Date("3/16/2021, 24:00:00"));
    expect(component.reminder.city).toBe("Córdoba");
    expect(component.reminder.color).toBe("#ffffff");
});

});
