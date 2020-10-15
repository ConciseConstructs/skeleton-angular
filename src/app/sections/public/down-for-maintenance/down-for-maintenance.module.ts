import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DownForMaintenancePageRoutingModule } from './down-for-maintenance-routing.module';

import { DownForMaintenancePage } from './down-for-maintenance.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DownForMaintenancePageRoutingModule
  ],
  declarations: [DownForMaintenancePage]
})
export class DownForMaintenancePageModule {}
