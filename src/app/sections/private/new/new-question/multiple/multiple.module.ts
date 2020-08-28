import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WidgetsModule } from '../../../../../../assets/widgets/widgets.module'
import { IonicModule } from '@ionic/angular';

import { MultiplePageRoutingModule } from './multiple-routing.module';

import { MultiplePage } from './multiple.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    WidgetsModule,
    IonicModule,
    MultiplePageRoutingModule
  ],
  declarations: [MultiplePage]
})
export class MultiplePageModule {}
