import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MultiplePage } from './multiple.page';
import { SessionGuard } from 'src/assets/guards/session.guard';

const routes: Routes = [
  { path: '', canLoad: [SessionGuard], component: MultiplePage }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MultiplePageRoutingModule {}
