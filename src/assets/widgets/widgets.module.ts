import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'
import { ReactiveFormsModule } from '@angular/forms'
import { FormsModule } from '@angular/forms'
import { MobileHeaderComponent } from './mobile-header/mobile-header.component'
import { PcHeaderComponent } from './pc-header/pc-header.component'
import { SchedulerComponent } from './scheduler/scheduler.component'
import { QuestionTextFormComponent } from './forms/question-text.form/question-text-form.component'
import { QuestionBooleanFormComponent } from './forms/question-boolean-form/question-boolean-form.component'
import { QuestionMultipleFormComponent } from './forms/question-multiple-form/question-multiple-form.component'
import { QuizFormComponent } from './forms/quiz-form/quiz-form.component'
import { TagFormComponent } from './forms/tag-form/tag-form.component'
import { QuestionaireTextComponent } from './questionaire-text/questionaire-text.component'
import { QuestionaireBooleanComponent } from './questionaire-boolean/questionaire-boolean.component'
import { QuestionaireMultipleChoiceComponent } from './questionaire-multiple-choice/questionaire-multiple-choice.component'
import { QuestionaireMultipleAnswerComponent } from './questionaire-multiple-answer/questionaire-multiple-answer.component'
import { FadeInViewDirective } from '../directives/fadeInView.directive'
import { SelectButtonModule } from 'primeng/selectbutton'
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextareaModule } from 'primeng/inputtextarea'
import { RadioButtonModule } from 'primeng/radiobutton'
import { SpinnerModule } from 'primeng/spinner'
import { CheckboxModule } from 'primeng/checkbox';
import { FieldsetModule } from 'primeng/fieldset';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CalendarModule } from 'primeng/calendar'
import { ConfirmationService } from 'primeng/api'
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FeedbackHeaderComponent } from './feedback-header/feedback-header.component'
import { FeedbackToasterComponent } from './feedback-toaster/feedback-toaster.component'
import { DeviceComponent } from './device/device.component'



@NgModule({
  declarations: [
    MobileHeaderComponent,
    PcHeaderComponent,
    SchedulerComponent,
    QuestionTextFormComponent,
    QuestionBooleanFormComponent,
    QuestionMultipleFormComponent,
    QuizFormComponent,
    TagFormComponent,
    QuestionaireTextComponent,
    QuestionaireBooleanComponent,
    QuestionaireMultipleChoiceComponent,
    QuestionaireMultipleAnswerComponent,
    FadeInViewDirective,
    FeedbackHeaderComponent,
    FeedbackToasterComponent,
    DeviceComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    DropdownModule,
    MultiSelectModule,
    InputTextareaModule,
    RadioButtonModule,
    SpinnerModule,
    CheckboxModule,
    FieldsetModule,
    ConfirmDialogModule,
    CalendarModule,
    ToggleButtonModule,
  ],
  exports: [
    MobileHeaderComponent,
    PcHeaderComponent,
    SchedulerComponent,
    QuestionTextFormComponent,
    QuestionBooleanFormComponent,
    QuestionMultipleFormComponent,
    QuizFormComponent,
    TagFormComponent,
    QuestionaireTextComponent,
    QuestionaireBooleanComponent,
    QuestionaireMultipleChoiceComponent,
    QuestionaireMultipleAnswerComponent,
    FadeInViewDirective,
    SelectButtonModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    DropdownModule,
    InputTextareaModule,
    RadioButtonModule,
    SpinnerModule,
    CheckboxModule,
    FieldsetModule,
    MultiSelectModule,
    ConfirmDialogModule,
    CalendarModule,
    FeedbackHeaderComponent,
    FeedbackToasterComponent,
    DeviceComponent,
    ToggleButtonModule,
  ],
  providers: [ConfirmationService]
})
export class WidgetsModule { }
