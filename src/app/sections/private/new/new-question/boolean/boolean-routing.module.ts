import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BooleanPage } from './boolean.page';
import { SessionGuard } from 'src/assets/guards/session.guard';

const routes: Routes = [
  { path: '', canLoad: [SessionGuard], component: BooleanPage }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BooleanPageRoutingModule {}
