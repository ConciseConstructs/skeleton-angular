import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddQuestionsPage } from './add-questions.page';
import { SessionGuard } from 'src/assets/guards/session.guard';

const routes: Routes = [
  { path: '', canLoad: [SessionGuard], component: AddQuestionsPage }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddQuestionsPageRoutingModule {}
