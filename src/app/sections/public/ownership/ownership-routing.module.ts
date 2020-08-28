import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OwnershipPage } from './ownership.page';

const routes: Routes = [
  { path: '', component: OwnershipPage }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OwnershipPageRoutingModule {}
