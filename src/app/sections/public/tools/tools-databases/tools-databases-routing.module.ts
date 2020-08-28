import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ToolsDatabasesPage } from './tools-databases.page';

const routes:Routes = [
  { path: '', component: ToolsDatabasesPage }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ToolsDatabasesPageRoutingModule {}
