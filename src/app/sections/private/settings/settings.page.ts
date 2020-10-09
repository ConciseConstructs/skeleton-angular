import { Component } from '@angular/core';
import { SiteService } from 'src/app/services/site/site.service';
import { ConciseComponent } from 'src/assets/classes/ConciseComponent.class';
import { Breadcrumbs } from 'src/assets/types/Breadcrumbs.type';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage extends ConciseComponent {

  public breadcrumbs:Breadcrumbs
  public defaultStreak:number
  public timezones:string[]
  public timezonesObject:{ label:string, value:string }[]
  public timezone:any
  public email:string
  public emailNotifications:boolean


  constructor(
    public site:SiteService
  ) {
    super(site)
  }












  protected init() {
    try { this._init() }
    catch (error) {
      this.onError({ signature: '117fd3a0-96b3-4934-b772-6b3f42e8eda1', details: error })
    }
  }




      private _init() {
        // this.defaultStreak = this.site.settings.preferences.streak || 3
        this.email = JSON.parse(localStorage.getItem(`${ sessionStorage.getItem('acctId') }.settings`)).email
        this.emailNotifications = JSON.parse(localStorage.getItem(`${ sessionStorage.getItem('acctId') }.settings`)).emailNotifications
        this.timezones = this.site.time.timezones
        this.timezonesObject = this.timezones.map(timezone => { return { label: timezone, value: timezone } })
        // if (this.site.settings.preferences.timezone) this.timezone = { label: this.site.settings.preferences.timezone, value: this.site.settings.preferences.timezone }
        // else this.onDetectTimeZone()
        this.backUrl = 'dashboard'
        this.createBreadCrumbs()
      }




          private createBreadCrumbs() {
            this.breadcrumbs = [
              { label: 'Settings' }
            ]
          }












  public onDetectTimeZone() {
    try { this._onDetectTimeZone() }
    catch (error) {
      this.onError({ signature: '0c53c85c-3d66-4eec-bde1-97dd405df20f', details: error })
    }
  }




      private _onDetectTimeZone() {
        let guess = this.site.time.guessTimeZone()
        this.timezone = this.timezonesObject.find(timezone => timezone.value === guess)
      }












  public onUpdateButtonClick() {
    try { this._onUpdateButtonClick() }
    catch (error) {
      this.onError({ signature: 'b7346151-6036-454e-bafd-141f767f4b18', details: error })
    }
  }




      private _onUpdateButtonClick() {
        let utcOffset = this.site.time.getUtcOffset(this.timezone.value)
        // this.site.settings.preferences.save({ streak: this.defaultStreak, timezone: this.timezone.value, utcOffset: utcOffset, email: this.email, emailNotifications: this.emailNotifications })
        this.navigateBack()
      }












  public onDeviceRemove(event) {
    try { this._onDeviceRemove(event) }
    catch (error) {
      this.onError({ signature: '6600a48f-8e80-49a8-94d0-175ce1e6d9e1', details: error })
    }
  }




      private _onDeviceRemove(event) {
        // this.site.devices.remove({ accountId: this.site.session.acctId, id: event.id })
        //   .then(result => this.onRemoveDeviceSuccess(result))
        //   .catch(error => this.onRemoveDeviceFailure(error))
      }




          private onRemoveDeviceFailure(error) {  console.error('error-1762c33e-1fd7-4cab-a4b8-f7b280b65254', error)
            this.site.ui.userFeedbackChannelSecondary({ message: 'Failed to Remove Device', state: 'error' })
          }




          private onRemoveDeviceSuccess(result) {
            this.site.ui.userFeedbackChannelSecondary({ message: 'Device removed.', state: 'success' })
          }












  public onLogoutButtonClick() {
    try { this._onLogoutButtonClick() }
    catch (error) {
      this.onError({ signature: 'b64201de-fd7e-4c22-acb6-0618b30f9bba', details: error })
    }
  }




      private _onLogoutButtonClick() {
        this.site.login.logout()
      }












  public get devices() {
    try { return this._devices() }
    catch (error) {
      this.onError({ signature: '4e448e29-3ec0-4ee8-9a83-24c7f1205e50', details: error })
    }
  }




      private _devices() {
        return null
        // return this.site.devices.records
      }













  public get emailNotificationStatus() {
    try { return this._emailNotificationStatus() }
    catch (error) {
      this.onError({ signature: '405f0d71-e9cb-4025-bb29-3e70afe1be33', details: error })
    }
  }




      private _emailNotificationStatus() {
        if (this.emailNotifications) return 'Enabled'
        else return 'Disabled'
      }

}
