import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WidgetsModule } from '../../../../assets/widgets/widgets.module'
import { IonicModule } from '@ionic/angular';

import { AddQuestionsPageRoutingModule } from './add-questions-routing.module';

import { AddQuestionsPage } from './add-questions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    WidgetsModule,
    IonicModule,
    AddQuestionsPageRoutingModule
  ],
  declarations: [AddQuestionsPage]
})
export class AddQuestionsPageModule {}
