import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ToolsMobilePage } from './tools-mobile.page';

const routes:Routes = [
  { path: '', component: ToolsMobilePage }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ToolsMobilePageRoutingModule {}
