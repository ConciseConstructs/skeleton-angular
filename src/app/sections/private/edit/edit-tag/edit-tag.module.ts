import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { WidgetsModule } from '../../../../../assets/widgets/widgets.module'
import { IonicModule } from '@ionic/angular';

import { EditTagPageRoutingModule } from './edit-tag-routing.module';

import { EditTagPage } from './edit-tag.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    WidgetsModule,
    IonicModule,
    EditTagPageRoutingModule,
  ],
  declarations: [EditTagPage]
})
export class EditTagPageModule {}
