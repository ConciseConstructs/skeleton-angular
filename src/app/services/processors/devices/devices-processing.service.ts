import { Injectable } from '@angular/core';
import { DataModelProcessingService } from 'src/assets/classes/DataModelProcessingService.class';
import { EventsService } from '../../site/events/events.service';
import { ApiService } from '../../site/api/api.service';
import { OfflineService } from '../../site/offline/offline.service';
import { Device } from 'src/assets/models/Device.model';


@Injectable({
  providedIn: 'root'
})
export class DevicesProcessingService extends DataModelProcessingService {

  constructor(
    protected events:EventsService,
    protected api:ApiService,
    protected offline:OfflineService,
  ) {
    super()
  }












  protected hookConstructorPre() {
    this.modelName = 'devices'
    this.Model = Device
    this.onNewDataEmitterName = 'onNewDevices'
  }












  protected setupEventListeners() {
    try { this._setupEventListeners() }
    catch (error) {
      this.events.onError.next({ signature: '4fff3616-5001-49a6-a4e7-9fb3ad60cb66', details: error })
    }
  }




      private _setupEventListeners() {
        if (this.events) this.events.onDeviceInfo.subscribe(deviceInfo => this.onDeviceInfo(deviceInfo))
        else {
          let monitorEventServiceCreation = setInterval(()=> {
            clearInterval(monitorEventServiceCreation)
            this.events.onDeviceInfo.subscribe(deviceInfo => this.onDeviceInfo(deviceInfo))
          }, 20)
        }
      }












  private onDeviceInfo(deviceInfo) {
    try { this._onDeviceInfo(deviceInfo) }
    catch (error) {
      this.events.onError.next({ signature: '22c79588-eb52-4148-be7a-5076bd2ed92a', details: error })
    }
  }




      private _onDeviceInfo(deviceInfo) {
        if (!deviceInfo) return  // Not a mobile device...
        else this.waitForLoginAndDeviceRecordsToLoad(deviceInfo)
      }




          private waitForLoginAndDeviceRecordsToLoad(deviceInfo) {
            this.events.onNewDevices.subscribe(outcome => {
              if (this.deviceIsAlreadySaved(deviceInfo)) return
              else this.saveNewDevice(deviceInfo)
            })
          }




              private deviceIsAlreadySaved(deviceInfo) {
                return (this.records.length > 0 && this.records.find(device => device.fcmToken === deviceInfo.fcmToken))
              }




              private saveNewDevice(deviceInfo) {
                if (sessionStorage.getItem('acctId')) this.save(deviceInfo)
                else this.waitForLoginAndDeviceRecordsToLoad(deviceInfo)
              }

}
