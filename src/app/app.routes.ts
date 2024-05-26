import { Routes } from '@angular/router';
import { MeasurementAddComponent } from './measurement-add/measurement-add.component';
import { MeasurementEditComponent } from './measurement-edit/measurement-edit.component';

export const routes: Routes = [
  { path: 'add', component: MeasurementAddComponent },
  { path: 'edit/:id', component: MeasurementEditComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' },
];
