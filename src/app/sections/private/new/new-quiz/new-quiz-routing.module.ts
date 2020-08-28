import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewQuizPage } from './new-quiz.page';
import { SessionGuard } from 'src/assets/guards/session.guard';

const routes: Routes = [
  { path: '', canLoad: [SessionGuard], component: NewQuizPage },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewQuizPageRoutingModule {}
