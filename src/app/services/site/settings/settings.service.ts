import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  public messages:{
    recordSaved:string
    recordRemoved:string
    offlineRecordSaved:string
    offlineRecordRemoved:string
    unknownError:string
    noRecordFoundRedirectToDashboard:string
    offlineConnection:string
    pleaseVerifyEmail:string
    signUpSuccess:string
    reasonFieldDescription:string
    genericErrorMessage:string
  }
  public descriptions: {
    username:string
    streak:string
    emailNotifications:string
  }
  public values:{
    email:string
    persistErrorsInterval:number
  }


  constructor(
  ) {
    this.setStandardMessages()
    this.createUiDescriptions()
    this.setValues()
  }




      private setStandardMessages() {
        let pleaseVerifyEmail = `Please check your email for a message from "no-reply@emailverification.com" and click the verification link.`
        this.messages = {
          genericErrorMessage: `An error occurred, please try again.`,
          recordSaved: 'Record saved.',
          recordRemoved: 'Record removed.',
          offlineRecordSaved: 'Saved offline record.  It will synchronize later.',
          offlineRecordRemoved: 'Removed offline record.  It will synchronize later.',
          unknownError: 'An unknown error occurred.  Please try again.',
          noRecordFoundRedirectToDashboard: 'No record found.  Returning to dashboard.',
          offlineConnection: 'Unable to connect to QA Servers.  You can try restarting the app or rebooting your device.  You can continue to use the app and next time you are able to connect we will synchronize your data.  Continuing in offline mode.',
          pleaseVerifyEmail: pleaseVerifyEmail,
          signUpSuccess: `Success. ${ pleaseVerifyEmail }`,
          reasonFieldDescription: `Reason Why (optional, helps reinforce the idea).`
        }
      }




      private createUiDescriptions() {
        this.descriptions = {
          username: 'email',
          streak: `This is how many consecutive correct answers before that question is moved to a different bucket (which is quized less often).`,
          emailNotifications: `Toggle "Quiz Due" email notifications.`
        }
      }




      private setValues() {
        this.values = {
          email: `PLACEHOLDER`,
          persistErrorsInterval: 60000
        }
      }

}
