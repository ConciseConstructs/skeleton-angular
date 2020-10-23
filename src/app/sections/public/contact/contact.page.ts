import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app/app.service';
import { ConciseComponent } from 'src/assets/classes/ConciseComponent.class';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage extends ConciseComponent {

  public contactData:any


  constructor(
    public app:AppService
  ) {
    super(app)
  }












  init() {
    this.contactData = {
      businessName: 'Concise Constructs, LLC',
      webAddress: 'www.conciseconstructs.com',
      email: 'concise.constructs@gmail.com',
      phone: '608-480-1909',
      physicalAddress1: '222 Wisconsin St',
      physicalAddress2: 'Suite #206',
      physicalAddressCity: 'Eau Claire',
      physicalAddressState: 'WI',
      physicalAddressPostalCode: '54703',
    }
  }














  public onFormContactSubmit(event) {
    this.app.contact.sendMessage({ from: event.contactInfo, message: event.message })
      .then(result => this.onSendMessageSuccess(result))
      .catch(error => this.onSendMessageFailure(error))
  }




      private onSendMessageFailure(error) {
        this.app.events.onError.next({ signature: 'error-5d21961a-76fc-41da-8a37-ecdf512335a8', details: error })
        this.app.ui.userFeedbackChannelSecondary({ message: this.app.settings.messages.genericErrorMessage, state: 'error'})
      }




      private onSendMessageSuccess(result) {
        if (!result.success) this.onSendMessageFailure(result)
        else this.processSuccessResult()
      }




          private processSuccessResult() {
            this.app.ui.userFeedbackChannelSecondary({ message: 'Message Sent', state: 'success' })
            this.app.router.navigate(['home'])
          }

}
