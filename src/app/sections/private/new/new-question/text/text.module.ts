import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { WidgetsModule } from '../../../../../../assets/widgets/widgets.module'
import { IonicModule } from '@ionic/angular';

import { TextPageRoutingModule } from './text-routing.module';

import { TextPage } from './text.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    WidgetsModule,
    IonicModule,
    TextPageRoutingModule
  ],
  declarations: [TextPage]
})
export class TextPageModule {}
