import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WidgetsModule } from '../../../../../../assets/widgets/widgets.module'
import { IonicModule } from '@ionic/angular';

import { BooleanPageRoutingModule } from './boolean-routing.module';

import { BooleanPage } from './boolean.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    WidgetsModule,
    IonicModule,
    BooleanPageRoutingModule
  ],
  declarations: [BooleanPage]
})
export class BooleanPageModule {}
