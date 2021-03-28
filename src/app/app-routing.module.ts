import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarHomeComponent } from './pages/calendar-home/calendar-home.component';

const routes: Routes = [
  { path: '',   component: CalendarHomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
