import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ScreenService } from '../screen/screen.service';
import { ConfirmationService } from 'primeng/api';
import { EventsService } from '../events/events.service';
import { UiFeedback } from 'src/assets/types/UiFeedback.type';


@Injectable({
  providedIn: 'root'
})
export class UiService {


  constructor(
    public confirmationService:ConfirmationService,
    private alertMobile:AlertController,
    private screen:ScreenService,
    private events:EventsService
  ) { }












  public alert(message) {
    try { this._alert(message) }
    catch (error) {
      this.events.onError.next({ signature: 'de4952a5-bf36-4c35-87bf-54db5832ae4b', details: error })
    }
  }




      private _alert(message) {
        alert(message)
      }












  public confirm():any {
    try { return this._confirm() }
    catch (error) {
      this.events.onError.next({ signature: 'fb9b61cc-8edd-4f6f-8cbd-7ab6c33e3f2e', details: error })
    }
  }




      private _confirm() {
        if (this.screen.device === 'mobile') return this.alertMobile
        else return this.alertDesktopUiComponent()
      }




          private alertDesktopUiComponent() {
            let alertDesktopUiComponent = {
              create: function(params) {
                this.params = params
                return new Promise(resolve => resolve(this))
              },
              present: function() {
                this.confirmationService.confirm({
                  message: this.params.message,
                  accept: () => this.params.onConfirm(),
                  reject: () => this.params.onCancel()
                })
              },
              confirmationService: null,
            }
            alertDesktopUiComponent.confirmationService = this.confirmationService
            return alertDesktopUiComponent
          }












  public channelPrimary(params:UiFeedback) {
    this.events.onChannelPrimary.next(params)
  }












  public channelSecondary(params:UiFeedback) {
    this.events.onChannelSecondary.next(params)
  }

}
