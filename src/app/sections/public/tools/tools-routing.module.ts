import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ToolsPage } from './tools.page';

const routes:Routes = [
  { path: '', component: ToolsPage },
  { path: 'tools-platforms', loadChildren: () => import('./tools-platforms/tools-platforms.module').then( m => m.ToolsPlatformsPageModule) },
  { path: 'tools-mobile', loadChildren: () => import('./tools-mobile/tools-mobile.module').then( m => m.ToolsMobilePageModule) },
  { path: 'tools-clients', loadChildren: () => import('./tools-clients/tools-clients.module').then( m => m.ToolsClientsPageModule) },
  { path: 'tools-servers', loadChildren: () => import('./tools-servers/tools-servers.module').then( m => m.ToolsServersPageModule) },
  { path: 'tools-databases', loadChildren: () => import('./tools-databases/tools-databases.module').then( m => m.ToolsDatabasesPageModule) }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ToolsPageRoutingModule {}
