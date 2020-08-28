import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WidgetsModule } from '../../../../assets/widgets/widgets.module'
import { IonicModule } from '@ionic/angular';

import { NewPageRoutingModule } from './new-routing.module';

import { NewPage } from './new.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    WidgetsModule,
    IonicModule,
    NewPageRoutingModule,
  ],
  declarations: [NewPage]
})
export class NewPageModule {}
