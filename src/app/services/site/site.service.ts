import { Injectable } from '@angular/core';
import { Router } from '@angular/router'
import { EventsService } from './events/events.service';
import { ScreenService } from './screen/screen.service';
import { UiService } from './ui/ui.service';
import { SettingsService } from './settings/settings.service'
import { SharedService } from './shared/shared.service'
import { TimeService } from './time/time.service';
import { OfflineService } from './offline/offline.service';
import { ApiService } from '../api/api.service';
import { ConnectionService } from './connection/connection.service';
import { StandardReturn } from 'src/assets/types/StandardReturn.type';
import { AuthService } from './auth/auth.service'
import { environment as saas } from '../../../environments/environment'
import { RegistrationService } from './registration/registration.service';
import { LoginService } from './login/login.service';
import { InterpreterService } from './interpreter/interpreter.service';
import { SessionService } from './session/session.service'
import { LayersService } from './layers/layers.service'
import { PushService } from './notifications/push/push.service';
import { JobsService } from './jobs/jobs.service';
import { ErrorService } from './error/error.service';
import { ProcessingService } from '../processors/processing.service'
import { GlobalsService } from './globals/globals.service';
import { ContactService } from './contact/contact.service';
import { StorageService } from './storage/storage.service';
import { CaptchaService } from './captcha/captcha.service';


@Injectable({
  providedIn: 'root'
})
export class SiteService {

  public saasName:string
  private hasNotifiedOffline:boolean


  constructor(
    public readonly globals:GlobalsService,
    public readonly contact:ContactService,
    public readonly error:ErrorService,
    public readonly registration:RegistrationService,
    public readonly auth:AuthService,
    public readonly login:LoginService,
    public readonly session:SessionService,
    public readonly connection:ConnectionService,
    public readonly api:ApiService,
    public readonly router:Router,
    public readonly time:TimeService,
    public readonly screen:ScreenService,
    public readonly ui:UiService,
    public readonly layers:LayersService,
    public readonly interpreter:InterpreterService,
    public readonly processors:ProcessingService,
    public readonly push:PushService,
    public readonly jobs:JobsService,
    public readonly captcha:CaptchaService,
    public events:EventsService,
    public storage:StorageService,
    public offline:OfflineService,
    public settings:SettingsService,
    public shared:SharedService,
  ) {
    this.globals.getAllGlobals()
    this.setupValues()
    this.setupGlobalEventListeners()
    this.loadRecords()
  }




      private setupValues() {
        this.hasNotifiedOffline = false
        this.saasName = saas.name
      }




      private setupGlobalEventListeners() {
        this.events.onConnectionChange.subscribe(connectionState => this.onConnectionChange(connectionState))
        this.events.onRequestRecordRemovalSync.subscribe(record => this.onRequestRecordRemoval(record))
        this.events.onSynchronizedDatabase.subscribe(outcome => this.onSynchronizedDatabase(outcome))
        this.events.onLoginOutcome.subscribe(outcome => this.onLoginOutcome(outcome))
        this.events.onSessionValid.subscribe(() => this.onSessionValid())
      }












  private onRequestRecordsSync(records) {
    try { this._onRequestRecordsSync(records) }
    catch (error) {
      this.events.onError.next({ signature: '3f696eb9-7552-496d-bccf-6a4239069933', details: error })
    }
  }




      private _onRequestRecordsSync(records) {
        let promises = [ ]
        records.forEach(record => promises.push(this.processors[records.table].save(record)))
        Promise.all(promises)
          .then(result => this.onSyncRecordsSuccess(result))
          .catch(error => this.onSyncRecordsFailure(error))
      }




          private onSyncRecordsFailure(error) {  console.error('error-975aec77-c6b7-423a-89c9-d004b731c543', error)
            this.connection.online = false
          }




          private onSyncRecordsSuccess(results) {
            this.handleSyncResults(results)
          }













  private handleSyncResults(results) {
    if (!this.connection.online) return
    else results.forEach(result => {
      if (!result.success) this.connection.online = false
    })
  }












  private onConnectionChange(connection:StandardReturn) {
    try { this._onConnectionChange(connection) }
    catch (error) {
      this.events.onError.next({ signature: 'af3558f2-4838-4920-87e2-f5f3cc867201', details: error })
    }
  }




      private _onConnectionChange(connection) {
        if (!connection.success && !this.hasNotifiedOffline) this.notifyUserTheyAreOffline()
        else this.notifyUserTheyAreOnline()
      }




          private notifyUserTheyAreOffline() {
            let delayIncaseAppIsBootstrappingInterval = 1000
            this.waitForUiFeedbackComponentsToBootstrap(delayIncaseAppIsBootstrappingInterval)
          }




              private waitForUiFeedbackComponentsToBootstrap(interval) {
                setTimeout(()=> {
                  this.ui.userFeedbackChannelSecondary({ message: 'No connection, now in offline mode.', state: 'error' })
                  this.hasNotifiedOffline = true
                }, interval)
              }




          private notifyUserTheyAreOnline() {
            this.ui.userFeedbackChannelSecondary({ message: 'You are back online, synchronizing records.', state: 'success' })
          }












  private onSynchronizedDatabase(outcome) {
    this.loadRecords()
  }












  private loadRecords() {
    try { this._loadRecords() }
    catch (error) {
      this.events.onError.next({ signature: '157e9a15-dcaf-4ff9-b612-e233a0227988', details: error })
    }
  }




      private _loadRecords() {
        if (!sessionStorage.getItem('acctId')) return
        else this.loadRecordsViaModelProcessors()
      }




          private loadRecordsViaModelProcessors() {
            for (let [ processor, properties ] of Object.entries(this.processors)) {
              if ('loadRecords' in properties) (processor as any).loadRecords()
            }
          }












  private onRequestRecordRemoval(record) {
    try { this._onRequestRecordRemoval(record) }
    catch (error) {
      this.events.onError.next({ signature: '9bc8d9de-ee43-4b75-a91f-d2bd6f35205a', details: error })
    }
  }




      private _onRequestRecordRemoval(record) {
        this.api[record.table].remove({ accountId: this.session.acctId, id: record.id })
          .then(result => this.onRecordRemovalSuccess(result, record))
          .catch(error => this.onRecordRemovalFailure(error))
      }




          private onRecordRemovalFailure(error) {  console.error('error-', error)
            this.connection.online = false
            this.events.onRequestRecordRemovalSyncOutcome.next(error)
          }




          private onRecordRemovalSuccess(result, record) {
            result.details = record
            this.events.onRequestRecordRemovalSyncOutcome.next(result)
          }












  private onLoginOutcome(outcome) {
    if (!outcome.success) this.onLoginFailure()
    else this.onLoginSuccess()
  }




      private onLoginSuccess() {
        this.router.navigate(['dashboard'])
      }




      private onLoginFailure() {
        this.router.navigate(['home'])
      }












  private onSessionValid() {
    this.offline.createDbIfNotExist()
    this.offline.syncOfflineRecords()
  }












  public get renderFor():'pc'|'mobile' {
    try { return this._renderFor() }
    catch (error) {
      this.events.onError.next({ signature: '3a872d59-cfa7-49da-8741-b1dcb5a6cfb3', details: error })
    }
  }




      private _renderFor() {
        if (this.screen.device === 'pc' || this.screen.device === 'tablet') return 'pc'
        if (this.screen.device === 'mobile') return 'mobile'
      }












  public get deviceClasses():string[] {
    try { return this._deviceClasses() }
    catch (error) {
      this.events.onError.next({ signature: '', details: error })
    }
  }




      private _deviceClasses() {
        return Object.values(this.screen.summary)
      }

}
