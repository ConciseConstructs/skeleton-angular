import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditQuestionPage } from './edit-question.page';
import { SessionGuard } from 'src/assets/guards/session.guard';

const routes: Routes = [
  { path: '', canLoad: [SessionGuard], component: EditQuestionPage }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditQuestionPageRoutingModule {}
