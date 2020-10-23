import { Injectable } from '@angular/core';
import { Plugins, PushNotification, PushNotificationToken, Device } from '@capacitor/core'
import { EventsService } from '../../events/events.service';
import { ScreenService } from '../../screen/screen.service';

const { PushNotifications, Modals } = Plugins


@Injectable({
  providedIn: 'root'
})
export class PushService {


  constructor(
    private events:EventsService,
    private screen:ScreenService
  ) {
    this.init()
  }




      private init() {
        if (this.screen.deviceClasses.includes('mobile'))
          try { this.registerMobilePushNotifications() }
          catch (error) { this.events.onError.next({ signature: 'error-1e21b615-7377-4c73-b7fb-98bfb09b7e52', details: error }) }
      }




          private registerMobilePushNotifications() {
            PushNotifications.register()
            PushNotifications.addListener('registration', (token:PushNotificationToken) => this.onRegistration(token));
            PushNotifications.addListener('registrationError', (error: any) => { console.error('Error on registration: ' + JSON.stringify(error)); });
            PushNotifications.addListener('pushNotificationReceived', (notification: PushNotification) => this.onPushNotificationReceived(notification));
          }












  private onRegistration(token) {
    try { this.createDeviceProfile(token) }
    catch (error) { this.events.onError.next({ signature: 'error-c5c72e47-71b3-4a24-b927-83de8ead9b56', details: error }) }
  }




      private async createDeviceProfile(token) {
        let device = await Device.getInfo() as any
        delete device.appBuild
        delete device.appVersion
        delete device.batteryLevel
        delete device.isCharging
        delete device.isVirtual
        device.fcmToken = token.value
        this.events.onDeviceInfo.next(device)
      }












  private onPushNotificationReceived(notification) {
      var pushAlerturSound = new Audio('assets/audio.mp3');
      pushAlerturSound.play()
      Modals.alert({
        title: notification.title,
        message: notification.body
      })
  }

}
