import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewPage } from './new.page';
import { SessionGuard } from 'src/assets/guards/session.guard';

const routes: Routes = [
  { path: '', canLoad: [SessionGuard], component: NewPage },
  { path: 'quiz', canLoad: [SessionGuard], loadChildren: () => import('./new-quiz/new-quiz.module').then( m => m.NewQuizPageModule) },
  { path: 'question', canLoad: [SessionGuard], loadChildren: () => import('./new-question/new-question.module').then( m => m.NewQuestionPageModule) },
  { path: 'category', canLoad: [SessionGuard], loadChildren: () => import('./new-category/new-category.module').then( m => m.NewCategoryPageModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewPageRoutingModule {}
