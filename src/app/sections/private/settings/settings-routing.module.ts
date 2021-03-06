import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsPage } from './settings.page';
import { SessionGuard } from 'src/assets/guards/session.guard';

const routes: Routes = [
  { path: '', canLoad: [SessionGuard], component: SettingsPage }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsPageRoutingModule {}
