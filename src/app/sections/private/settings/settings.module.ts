import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WidgetsModule } from '../../../../assets/widgets/widgets.module'
import { IonicModule } from '@ionic/angular';

import { SettingsPageRoutingModule } from './settings-routing.module';

import { SettingsPage } from './settings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    WidgetsModule,
    IonicModule,
    SettingsPageRoutingModule,
  ],
  declarations: [SettingsPage]
})
export class SettingsPageModule {}
