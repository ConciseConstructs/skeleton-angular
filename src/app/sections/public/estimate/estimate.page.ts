import { Component, OnInit } from '@angular/core';
import { SiteService } from 'src/app/services/site/site.service';
import { ISendMessage } from 'src/assets/interfaces/contact-server-service-interface/send-message.interface';
import { ConciseComponent } from 'src/assets/classes/ConciseComponent.class';

@Component({
  selector: 'app-estimate',
  templateUrl: './estimate.page.html',
  styleUrls: ['./estimate.page.scss'],
})
export class EstimatePage extends ConciseComponent {

  constructor(
    public site:SiteService
  ) {
    super(site)
  }












  public onFormEstimateSubmit(values:ISendMessage) {
    this.site.contact.sendMessage(values)
      .then(result => this.onSendMessageSuccess(result))
      .catch(error => this.onSendMessageFailure(error))
  }




        private onSendMessageFailure(error) {
          this.site.events.onError.next({ signature: `error-`, details: error })
          this.site.ui.userFeedbackChannelSecondary({ message: this.site.settings.messages.genericErrorMessage, state: 'error' })
        }




        private onSendMessageSuccess(result) {
          if (!result.success) this.onSendMessageFailure(result)
          else this.handleSuccess()
        }




            private handleSuccess() {
              this.site.ui.userFeedbackChannelSecondary({ message: 'Message Sent', state: 'success' })
              this.site.router.navigate(['home'])
            }

}
