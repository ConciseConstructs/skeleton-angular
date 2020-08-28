import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstimatePageRoutingModule } from './estimate-routing.module';

import { EstimatePage } from './estimate.page';
import { WidgetsModule } from 'src/assets/widgets/widgets.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstimatePageRoutingModule,
    WidgetsModule
  ],
  declarations: [EstimatePage]
})
export class EstimatePageModule {}
