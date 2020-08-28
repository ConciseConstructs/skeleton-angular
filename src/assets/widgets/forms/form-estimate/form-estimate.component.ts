import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SiteService } from 'src/app/services/site/site.service';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { ISendMessage } from '../../../interfaces/contact-server-service-interface/send-message.interface'


@Component({
  selector: 'app-form-estimate',
  templateUrl: './form-estimate.component.html',
  styleUrls: ['./form-estimate.component.scss'],
})
export class FormEstimateComponent implements OnInit {

  @Output() output:EventEmitter<ISendMessage>
  public projectTimelineUnits:{ label:string, value:string }[]
  public form:FormGroup
  public hasVerified:boolean


  constructor(
    public site:SiteService
  ) {
    this.output = new EventEmitter()
  }












  ngOnInit() {
    this.hasVerified = false
    this.site.events.onVerifyHuman.subscribe(result => this.onVerifyHuman(result))
    this.makeTimelineUnits()
    this.makeEstimateForm()
  }




      private onVerifyHuman(result) {
        if (result) this.hasVerified = true
        else this.hasVerified = false
      }




      private makeTimelineUnits() {
        this.projectTimelineUnits = [
          { label: 'Days', value: 'days' },
          { label: 'Months', value: 'months '}
        ]
      }




      private makeEstimateForm() {
        this.form = new FormGroup({
          projectContactName: new FormControl(null, { validators: [Validators.required, Validators.minLength(2) ]}),
          projectContactInfo: new FormControl(null, { validators: [Validators.required, Validators.minLength(5) ]}),
          projectName: new FormControl(null),
          projectDescription: new FormControl(null, { validators: [Validators.required] }),
          projectRequirements: new FormControl(null),
          projectTimelineUnit: new FormControl('days', { validators: [Validators.required] }),
          projectTimelineValue: new FormControl(null, { validators: [Validators.required] })
        })
      }













  public get formFeedbackMessage() {
    if (this.form.valid === true) return null
    else return this.site.interpreter.form.feedbackMessage(this.form)
  }














  public get displayErrorMessage() {
    if (this.form.dirty && this.form.status === 'INVALID') return true
    else return false
  }












  public onFormSubmitButtonClick() {
    let formattedValues = this.makeFormattedValues()
    this.output.emit(formattedValues)
  }




      private makeFormattedValues() {
        return {
          from: `Contact: ${ this.form.value.projectContactInfo } - Name: ${ this.form.value.projectContactName }`,
          message: `Project Name: ${ this.form.value.projectName } - Project Description: ${ this.form.value.projectDescription } - Project Requirements: ${ this.form.value.projectRequirements } - Timeline: ${ this.form.value.projectTimelineValue } ${ this.form.value.projectTimelineUnit }`
        }
      }

}
