import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'
import { ReactiveFormsModule } from '@angular/forms'
import { FormsModule } from '@angular/forms'
import { RecaptchaModule } from 'ng-recaptcha';
import { HeaderMobileComponent } from './header-mobile/header-mobile.component'
import { HeaderPcComponent } from './header-pc/header-pc.component'
import { SchedulerComponent } from './scheduler/scheduler.component'
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
import { TabViewModule } from 'primeng/tabview';
import { SlideMenuModule } from 'primeng/slidemenu'
import { OverlayLoadingComponent } from './overlay-loading/overlay-loading.component'
import { BackgroundVideoComponent } from './background-video/background-video.component'
import { SliderModule } from 'primeng/slider';
import { IconSubtitledComponent } from './icon-subtitled/icon-subtitled.component'
import { IconsContainerComponent } from './icons-container/icons-container.component'
import { FooterComponent } from './footer/footer.component'
import { FormContactComponent } from './forms/form-contact/form-contact.component'
import { CaptchaGoogleComponent } from './captcha-google/captcha-google.component'
import { FormBraintreePaymentComponent } from './forms/form-braintree-payment/form-braintree-payment.component'
import { PolicyPrivacyViewComponent } from './policy/policy-privacy-view/policy-privacy-view.component'
import { PolicyRefundViewComponent } from './policy/policy-refund-view/policy-refund-view.component'
import { FeedbackHeaderComponent } from './feedback-header/feedback-header.component'
import { FeedbackToasterComponent } from './feedback-toaster/feedback-toaster.component'
import { DeviceComponent } from './device/device.component'



@NgModule({
  declarations: [
    FadeInViewDirective,
    OverlayLoadingComponent,
    HeaderMobileComponent,
    FooterComponent,
    HeaderPcComponent,
    SchedulerComponent,
    SchedulerComponent,
    FeedbackHeaderComponent,
    FeedbackToasterComponent,
    DeviceComponent,
    BackgroundVideoComponent,
    IconSubtitledComponent,
    IconsContainerComponent,
    FormContactComponent,
    CaptchaGoogleComponent,
    FormBraintreePaymentComponent,
    PolicyPrivacyViewComponent,
    PolicyRefundViewComponent
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
    TabViewModule,
    FieldsetModule,
    ConfirmDialogModule,
    CalendarModule,
    ToggleButtonModule,
    SliderModule,
    RecaptchaModule,
    SlideMenuModule,
  ],
  exports: [
    HeaderMobileComponent,
    HeaderPcComponent,
    SchedulerComponent,
    SchedulerComponent,
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
    TabViewModule,
    SlideMenuModule,
    FeedbackHeaderComponent,
    FeedbackToasterComponent,
    DeviceComponent,
    ToggleButtonModule,
    OverlayLoadingComponent,
    BackgroundVideoComponent,
    SliderModule,
    IconSubtitledComponent,
    IconsContainerComponent,
    FooterComponent,
    FormContactComponent,
    CaptchaGoogleComponent,
    FormBraintreePaymentComponent,
    PolicyPrivacyViewComponent,
    PolicyRefundViewComponent
  ],
  providers: [ConfirmationService]
})
export class WidgetsModule { }
