import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WidgetsModule } from '../../../../../assets/widgets/widgets.module'
import { IonicModule } from '@ionic/angular';

import { EditQuestionPageRoutingModule } from './edit-question-routing.module';

import { EditQuestionPage } from './edit-question.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    WidgetsModule,
    IonicModule,
    EditQuestionPageRoutingModule
  ],
  declarations: [EditQuestionPage]
})
export class EditQuestionPageModule {}
