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

  private hasNotifiedOffline:boolean


  constructor(
    public confirmationService:ConfirmationService,
    private alertMobile:AlertController,
    private screen:ScreenService,
    private events:EventsService
  ) {
    this.hasNotifiedOffline = false
  }












  public alert(message) {
    try { this._alert(message) }
    catch (error) {
      this.events.onError.next({ signature: 'error-de4952a5-bf36-4c35-87bf-54db5832ae4b', details: error })
    }
  }




      private _alert(message) {
        alert(message)
      }












  public confirm():any {
    try { return this._confirm() }
    catch (error) {
      this.events.onError.next({ signature: 'error-fb9b61cc-8edd-4f6f-8cbd-7ab6c33e3f2e', details: error })
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












  public notifyUserTheyAreOffline() {
    if (this.hasNotifiedOffline) return
    let delayIncaseAppIsBootstrappingInterval = 1000
    this.waitForUiFeedbackComponentsToBootstrap(delayIncaseAppIsBootstrappingInterval)
  }




      private waitForUiFeedbackComponentsToBootstrap(interval) {
        setTimeout(()=> {
          this.userFeedbackChannelSecondary({ message: 'No connection, now in offline mode.', state: 'error' })
          this.hasNotifiedOffline = true
        }, interval)
      }












  public notifyUserTheyAreOnline() {
    this.userFeedbackChannelSecondary({ message: 'You are back online, synchronizing records.', state: 'success' })
    this.hasNotifiedOffline = false
  }












  public userFeedbackChannelPrimary(params:UiFeedback) {
    this.events.onUserFeedbackChannelPrimary.next(params)
  }












  public userFeedbackChannelSecondary(params:UiFeedback) {
    this.events.onUserFeedbackChannelSecondary.next(params)
  }

}
