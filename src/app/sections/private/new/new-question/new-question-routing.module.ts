import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewQuestionPage } from './new-question.page';
import { SessionGuard } from 'src/assets/guards/session.guard';

const routes: Routes = [
  { path: '', canLoad: [SessionGuard], component: NewQuestionPage },
  { path: 'text', canLoad: [SessionGuard], loadChildren: () => import('./text/text.module').then( m => m.TextPageModule) },
  { path: 'boolean', canLoad: [SessionGuard], loadChildren: () => import('./boolean/boolean.module').then( m => m.BooleanPageModule) },
  { path: 'multiple', canLoad: [SessionGuard], loadChildren: () => import('./multiple/multiple.module').then( m => m.MultiplePageModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewQuestionPageRoutingModule {}
