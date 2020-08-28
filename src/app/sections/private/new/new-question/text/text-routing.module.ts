import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TextPage } from './text.page';
import { SessionGuard } from 'src/assets/guards/session.guard';

const routes: Routes = [
  { path: '', canLoad: [SessionGuard], component: TextPage }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TextPageRoutingModule {}
