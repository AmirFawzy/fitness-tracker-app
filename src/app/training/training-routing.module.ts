import { NgModule } from '../../../node_modules/@angular/core';
import { RouterModule, Routes } from '../../../node_modules/@angular/router';

import { TrainingComponent } from './training.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  { path: '', component: TrainingComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingRoutingModule { }
