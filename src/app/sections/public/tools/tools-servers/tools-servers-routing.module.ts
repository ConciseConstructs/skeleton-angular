import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ToolsServersPage } from './tools-servers.page';

const routes:Routes = [
  { path: '', component: ToolsServersPage }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ToolsServersPageRoutingModule {}
