import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { WidgetsModule } from '../../../../assets/widgets/widgets.module'
import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WidgetsModule,
    DashboardPageRoutingModule,
    WidgetsModule
  ],
  declarations: [DashboardPage]
})
export class DashboardPageModule {}
