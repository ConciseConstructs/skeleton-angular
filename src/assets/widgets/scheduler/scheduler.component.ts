import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SiteService } from 'src/app/services/site/site.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ScheduleDetails } from 'src/assets/types/ScheduleDetails.type';
import { ScheduleProcessingService } from 'src/app/services/processors/schedule-processing/schedule-processing.service';


@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss'],
})
export class SchedulerComponent implements OnInit {

  @Input() record:ScheduleDetails
  @Output() output:EventEmitter<any>
  public form:FormGroup
  public unitOptions:{ name:string, value:string }[]
  public nextQuiz:any


  constructor(
    public site:SiteService,
    private scheduleService:ScheduleProcessingService
  ) {
    this.output = new EventEmitter()
    this.createUnitOptions()
  }












  ngOnInit() {
    try { this.init() }
    catch (error) { this.onError({ signature: 'cf565623-1e60-4652-b756-3eb65c3febe9', details: error }) }
  }




      private init() {
        this.createForm()
        this.patchUnitValue()
        this.patchTimeValue()
      }




          private createForm() {
            this.form = new FormGroup({
              rate: new FormControl(this.record.rate || 1, { validators: [Validators.required, Validators.min(1), Validators.max(365) ]}),
              unit: new FormControl(null, { validators: [Validators.required] }),
              time: new FormControl(null, { validators: [Validators.required] })
            })
          }




          private patchUnitValue() {
            let unit = this.unitOptions.find(option => option.value === this.record.unit)
            if (unit && this.site.renderFor === 'mobile') this.form.controls.unit.patchValue(unit.value)
            else if (unit) this.form.controls.unit.patchValue(unit)
          }





          private patchTimeValue() {
            if (!this.record.time) return
            let [ hours, minutes ] = (this.record.time as string).split(':')
            let value = new Date()
            value.setHours(parseInt(hours))
            value.setMinutes(parseInt(minutes))
            this.form.controls.time.patchValue(value)
          }












  public createUnitOptions() {
    this.unitOptions = [
      { name: "Day(s)", value: 'day' },
      { name: "Month(s)", value: 'month'},
      { name: "Monday(s)", value: 'monday' },
      { name: "Tuesday(s)", value: 'tuesday' },
      { name: "Wednesday(s)", value: 'wednesday' },
      { name: "Thursday(s)", value: 'thursday' },
      { name: "Friday(s)", value: 'friday' },
      { name: "Saturday(s)", value: 'saturday' },
      { name: "Sunday(s)", value: 'sunday' },
    ]
  }












  public get uiRate() {
    try { return this.form.controls.rate.value }
    catch (error) { this.onError({ signature: 'ca96ac7d-83b2-4d40-8b12-7fd719c4be99', details: error }) }
  }










  public get uiUnit():string {
    try { return this._uiUnit() }
    catch (error) { this.onError({ signature: '163c630e-562d-48a1-ad2b-2bc95cff50c8', details: error }) }
  }




      private _uiUnit() {
        if (!this.form.controls.unit.value) return
        else if (this.site.renderFor === 'mobile') return this.unitOptions.find(option => option.value === this.form.controls.unit.value).name
        else return `${ this.form.controls.unit.value.name }`
      }












  public get uiTime():string {
    try { return this._uiTime() }
    catch (error) { this.onError({ signature: '20cac438-a462-4e85-ab14-2aa8cb3ebe79', details: error }) }
  }




      private _uiTime() {
        if (!this.form.controls.time.value) return
        let militaryTime = this.site.interpreter.componentOutput('time', this.form.controls.time.value)
        return `${ militaryTime } hours.`
      }












  public  fixTimePickerUiQuirk() {
    try { this._fixTimePickerUiQuirk() }
    catch (error) { this.onError({ signature: '91a9894a-1902-4c9b-8f9b-598245199fa3', details: error }) }
  }




      private async _fixTimePickerUiQuirk() {
        this.site.layers["layer-main"].style.display = 'none';
        this.site.layers["layer-background"].style.display = 'none';
        await this.sleepToAvoidTimePickerUiQuirk(1);
        this.site.layers["layer-background"].style.display = 'block'
        this.site.layers["layer-main"].style.display = 'block'
      }




          private sleepToAvoidTimePickerUiQuirk(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
          }














  public get uiFirstQuiz() {
    try { return this._uiFirstQuiz() }
    catch (error) { this.onError({ signature: 'error-d46b46b5-27c6-4cd0-893a-abf08a3d5473', details: error }) }
  }




      private _uiFirstQuiz() {
        let values = this.formatFormComponentValues()
        if (!values.unit || !values.time) return
        if (values.unit === 'day') return this.makeUiFirstQuizForDays()
        else if (values.unit === 'month') return this.makeUiFirstQuizForMonths()
        else return this.makeUiFirstQuizForWeekday()
      }




          private makeUiFirstQuizForDays() {
            let values = this.formatFormComponentValues()
            this.nextQuiz = this.scheduleService.nextQuizForDaysUnit(values)
            this.emit()
            if (this.nextQuiz) return this.nextQuiz.format("dddd, MMMM Do YYYY, h:mm:ss a")
          }




          private makeUiFirstQuizForMonths() {
            let values = this.formatFormComponentValues()
            this.nextQuiz = this.scheduleService.nextQuizForMonthsUnit(values)
            this.emit()
            if (this.nextQuiz) return this.nextQuiz.format('dddd, MMMM, Do YYYY, h:mm:ss a')
          }




          private makeUiFirstQuizForWeekday() {
            let values = this.formatFormComponentValues()
            this.nextQuiz = this.scheduleService.nextQuizForWeekdayUnit(values)
            this.emit()
            if (this.nextQuiz) return this.nextQuiz.format("dddd, MMMM Do YYYY, h:mm:ss a")
          }




              private formatFormComponentValues() {
                let values = { } as any
                values.rate = this.form.controls.rate.value
                values.time = this.form.controls.time.value
                if (this.site.renderFor === 'mobile') values.unit = this.form.controls.unit.value
                else if (this.form.controls.unit.value) values.unit = this.form.controls.unit.value.value
                return values
              }












  private emit() {
    try { this._emit() }
    catch (error) { this.onError({ signature: 'error-df8179c2-e939-42af-ace4-be70a54bb30f', details: error }) }
  }




      private _emit() {
        let values = this.formatFormComponentValues()
        if (!values.rate || !values.unit || !values.time || !this.nextQuiz) return
        let output = this.scheduleService.prepareForPersistence({ rate: values.rate, unit: values.unit, time: values.time, nextQuiz: this.nextQuiz })
        this.output.emit(output)
      }












  private onError(params:{ signature:string, details:any }) {
    this.site.events.onError.next(params)
  }

}
