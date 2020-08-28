import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs'
import { StandardReturn } from 'src/assets/types/StandardReturn.type';
import { ScreenSummary } from 'src/assets/types/ScreenSummary.type';
import { UiFeedback } from 'src/assets/types/UiFeedback.type';


@Injectable({
  providedIn: 'root'
})
export class EventsService {

  public onScreenSize:BehaviorSubject<ScreenSummary>
  public onAuthProfileCreateOutcome:Subject<StandardReturn>
  public onAuthPasswordForgotRequest:Subject<StandardReturn>
  public onAuthPasswordForgotConfirmation:Subject<StandardReturn>
  public onLoginProfileCreateOutcome:Subject<StandardReturn>
  public onSignUpOutcome:Subject<StandardReturn>
  public onLoginOutcome:Subject<StandardReturn>
  public onAccountId:Subject<string>
  public onCreateDatabase:Subject<StandardReturn>
  public onSessionValid:Subject<undefined>
  public onConnectionChange:BehaviorSubject<StandardReturn>
  public onRequestRecordRemovalSync:Subject<{ table:string, id:string }>
  public onRequestRecordRemovalSyncOutcome:Subject<StandardReturn>
  public onSynchronizedDatabase:Subject<StandardReturn>
  public onUserFeedbackChannelPrimary:Subject<UiFeedback>
  public onUserFeedbackChannelSecondary:Subject<UiFeedback>
  public onDeviceInfo:BehaviorSubject<{ manufacturer:string, model:string, platform:string, operatingSystem:string, osVersion:string, uuid:string, fcmToken:string, }>
  public onNewDevices:Subject<StandardReturn>
  public onNewDateDue:BehaviorSubject<any>
  public onCaptchaSubmission:Subject<string>
  public onVerifyHuman:Subject<boolean>
  public onError:Subject<{ signature:string, details:any }>


  constructor() {
    this.createEvents()
  }




      private createEvents() {
        this.onScreenSize = new BehaviorSubject({ device: 'pc', orientation: 'portrait', size: 'medium' })
        this.onAuthProfileCreateOutcome = new Subject()
        this.onAuthPasswordForgotRequest = new Subject()
        this.onAuthPasswordForgotConfirmation = new Subject()
        this.onLoginProfileCreateOutcome = new Subject()
        this.onSignUpOutcome = new Subject()
        this.onLoginOutcome = new Subject()
        this.onAccountId = new Subject()
        this.onCreateDatabase = new Subject()
        this.onSessionValid = new Subject()
        this.onConnectionChange = new BehaviorSubject({ success: true, details: 'Initial state is presumed online' })
        this.onUserFeedbackChannelPrimary = new Subject()
        this.onUserFeedbackChannelSecondary = new Subject()
        this.onDeviceInfo = new BehaviorSubject(null)
        this.onNewDateDue = new BehaviorSubject(null)
        this.onSynchronizedDatabase = new Subject()
        this.onNewDevices = new Subject()
        this.onRequestRecordRemovalSync = new Subject()
        this.onRequestRecordRemovalSyncOutcome = new Subject()
        this.onCaptchaSubmission = new Subject()
        this.onVerifyHuman = new Subject()
        this.onError = new Subject()
      }

}
