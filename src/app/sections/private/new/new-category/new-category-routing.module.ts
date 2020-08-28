import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewCategoryPage } from './new-category.page';
import { SessionGuard } from 'src/assets/guards/session.guard';

const routes: Routes = [
  { path: '', canLoad: [SessionGuard], component: NewCategoryPage }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewCategoryPageRoutingModule {}
