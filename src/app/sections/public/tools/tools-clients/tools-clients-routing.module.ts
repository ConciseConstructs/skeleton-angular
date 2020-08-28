import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ToolsClientsPage } from './tools-clients.page';

const routes:Routes = [
  { path: '', component: ToolsClientsPage }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ToolsClientsPageRoutingModule {}
