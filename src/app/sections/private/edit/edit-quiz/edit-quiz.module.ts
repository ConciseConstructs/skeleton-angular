import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WidgetsModule } from '../../../../../assets/widgets/widgets.module'
import { IonicModule } from '@ionic/angular';

import { EditQuizPageRoutingModule } from './edit-quiz-routing.module';

import { EditQuizPage } from './edit-quiz.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    WidgetsModule,
    IonicModule,
    EditQuizPageRoutingModule,
  ],
  declarations: [EditQuizPage]
})
export class EditQuizPageModule {}
