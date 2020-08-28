import { Injectable } from '@angular/core';
import { DataModelProcessingService } from 'src/assets/classes/DataModelProcessingService.class';
import { Settings } from 'src/assets/models/Settings.model';
import { EventsService } from '../../site/events/events.service';
import { ApiService } from '../../site/api/api.service';
import { OfflineService } from '../../site/offline/offline.service';


@Injectable({
  providedIn: 'root'
})
export class SettingsProcessingService extends DataModelProcessingService {

  public streak:number
  public timezone:string


  constructor(
    protected events:EventsService,
    protected api:ApiService,
    protected offline:OfflineService,
  ) {
    super()
  }












  protected hookConstructorPre() {
    this.modelName = 'settings'
    this.Model = Settings
    this.onNewDataEmitterName = 'onNewSettings'
  }












  protected hookConstructorPost() {
    this.streak = this.streak || 3
  }












  protected processOnSaveRecordSuccess(result, record) {
    if (!result.success) this.onSaveRecordFailure(result, record)
    this.records = this.offline.insertItem({ table: `${ sessionStorage.getItem('acctId') }.${ this.modelName }`, record: record })
    this.streak = record.streak
    this.timezone = record.timezone
  }












  public get email():string {
    try { return this._email() }
    catch (error) {
      this.events.onError.next({ signature: '16c2f83e-2d8c-40f3-af2e-f3e7a86a96d5', details: error })
    }
  }




      private _email() {
        return this.records[0].email
      }












  public get emailNotifications():boolean {
    try { return this._emailNotifications() }
    catch (error) {
      this.events.onError.next({ signature: 'a01ff3d5-89d1-4c48-931e-b79dcd0da78b', details: error })
    }
  }




      private _emailNotifications() {
        return this.records[0].emailNotifications
      }

}
