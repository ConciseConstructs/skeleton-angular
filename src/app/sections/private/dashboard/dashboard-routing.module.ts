import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';
import { SessionGuard } from 'src/assets/guards/session.guard';

const routes: Routes = [
  { path: '', canLoad: [SessionGuard], component: DashboardPage }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
