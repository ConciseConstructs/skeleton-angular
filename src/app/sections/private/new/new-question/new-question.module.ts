import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WidgetsModule } from '../../../../../assets/widgets/widgets.module'
import { IonicModule } from '@ionic/angular';

import { NewQuestionPageRoutingModule } from './new-question-routing.module';

import { NewQuestionPage } from './new-question.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    WidgetsModule,
    IonicModule,
    NewQuestionPageRoutingModule,
  ],
  declarations: [NewQuestionPage]
})
export class NewQuestionPageModule {}
