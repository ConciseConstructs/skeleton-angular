import { Input, Output, EventEmitter } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { copyOf } from 'src/assets/utilities/copyOf'


export abstract class GenericFormClass {

  @Input() record?:any
  @Input() buttonLabel:string
  @Output() output:EventEmitter<any> = new EventEmitter()
  public form:FormGroup
  public submitButtonLabel:string
  protected isolatedCopy:any
  protected hookSetModelPre() { }
  protected hookSetModelPost() { }
  protected hookCreateFormPre() { }
  protected hookCreateFormPost() { }
  protected hookBindRecordToFormPre() { }
  protected hookBindRecordToFormPost() { }


  constructor() { }












  ngOnInit() {
    this.hookSetModelPre()
    this.setModel()
    this.hookSetModelPost()
    this.setSubmitButtonLabel()
    this.hookCreateFormPre()
    this.createForm()
    this.hookCreateFormPost()
    this.hookBindRecordToFormPre()
    this.bindRecordToForm()
    this.hookBindRecordToFormPost()
  }




      protected setModel() {
        this.isolatedCopy = copyOf(this.record)
      }




      protected setSubmitButtonLabel() {
        if (this.buttonLabel) this.submitButtonLabel = this.buttonLabel
        else if (this.record) this.submitButtonLabel = `Update`
        else this.submitButtonLabel = `Create`
      }




      protected createForm() { }




      protected bindRecordToForm() {
        Object.keys(this.form.controls).forEach(field => {
          if (this.isolatedCopy[field] !== undefined && this.isolatedCopy[field] !== null) {
            if (this.isolatedCopy[field].constructor === Boolean) this.form.patchValue({ [field]: `${ this.isolatedCopy[field] }` })
            else this.form.patchValue({ [field]: this.isolatedCopy[field] })
          }
        })
      }












  public onSubmitButtonClick() {
    this.bindFormValuesToRecord()
    this.hookMutateDataBeforeEmit()
    this.output.emit(this.isolatedCopy)
  }












      protected bindFormValuesToRecord() {
        for (let [ field, value ] of Object.entries(this.form.value)) {
          this.isolatedCopy[field] = value
        }
      }




      protected hookMutateDataBeforeEmit() { }







  public get canSubmit():boolean {
    return this.form.valid
  }












  public get feedbackMessage():string {
    for (let [ field, properties ] of Object.entries(this.form.controls)) {
      if (properties.status === 'INVALID') return this.selectErrorMessage(field, properties)
    }
    return null
  }




      public selectErrorMessage(field, properties):string {
        for (let [ validation ] of Object.entries(properties.errors))
          if (validation === 'required') return `${ this.capitalize(field) } is required.`
          else throw new Error('Unknown Validation')
      }




          private capitalize(string:string):string {
            let leadingChar = string.slice(0, 1)
            return `${ leadingChar.toUpperCase() }${ string.slice(1) }`
          }

}
