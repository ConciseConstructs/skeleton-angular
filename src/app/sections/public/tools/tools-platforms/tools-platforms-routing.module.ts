import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ToolsPlatformsPage } from './tools-platforms.page';

const routes:Routes = [
  { path: '', component: ToolsPlatformsPage }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ToolsPlatformsPageRoutingModule {}
