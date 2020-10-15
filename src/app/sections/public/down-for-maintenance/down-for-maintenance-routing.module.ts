import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DownForMaintenancePage } from './down-for-maintenance.page';

const routes: Routes = [
  {
    path: '',
    component: DownForMaintenancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DownForMaintenancePageRoutingModule {}
