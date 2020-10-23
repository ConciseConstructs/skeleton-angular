import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AppService } from 'src/app/services/app/app.service';


@Component({
  selector: 'app-form-contact',
  templateUrl: './form-contact.component.html',
  styleUrls: ['./form-contact.component.scss'],
})
export class FormContactComponent implements OnInit {

  @Input() contactData:any
  @Output() output:any
  public contactInfo:string
  public message:string
  public hasVerified:boolean


  constructor(
    public app:AppService,
  ) {
    this.output = new EventEmitter()
  }












  public ngOnInit() {
    this.hasVerified = false
    this.app.events.onVerifyHuman.subscribe(result => this.onVerifyHuman(result))
  }




      private onVerifyHuman(result) {
        console.log('FormContactComponent.onVerifyHuman:result:', result)
        if (result) this.hasVerified = true
        else this.hasVerified = false
      }












  public onFormSubmitButton() {
    this.output.emit({ contactInfo: this.contactInfo, message: this.message })
  }

}
