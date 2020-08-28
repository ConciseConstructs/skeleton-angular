import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditTagPage } from './edit-tag.page';
import { SessionGuard } from 'src/assets/guards/session.guard';

const routes: Routes = [
  { path: '', canLoad: [SessionGuard], component: EditTagPage }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditTagPageRoutingModule {}
