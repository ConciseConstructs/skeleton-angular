import { Injectable } from '@angular/core';
import { Router } from '@angular/router'
import { EventsService } from './events/events.service';
import { ScreenService } from './screen/screen.service';
import { UiService } from './ui/ui.service';
import { SettingsService } from './settings/settings.service'
import { QuestionsProcessingService } from '../processors/questions-processing/questions.processing.service';
import { TagsProcessingService } from '../processors/tags-processing/tags.processing.service';
import { QuizesProcessingService } from '../processors/quizes-processing/quizes.processing.service';
import { SharedService } from './shared/shared.service'
import { TimeService } from './time/time.service';
import { OfflineService } from './offline/offline.service';
import { ApiService } from './api/api.service';
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
import { DevicesProcessingService } from '../processors/devices/devices-processing.service';
import { SettingsProcessingService } from '../processors/settings-processing/settings-processing.service'
import { ErrorService } from './error/error.service';


@Injectable({
  providedIn: 'root'
})
export class SiteService {

  public saasName:string
  private hasNotifiedOffline:boolean


  constructor(
    public events:EventsService,
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
    public readonly devices:DevicesProcessingService,
    public readonly push:PushService,
    public readonly jobs:JobsService,
    public offline:OfflineService,
    public settings:SettingsService,
    public shared:SharedService,
    public questions:QuestionsProcessingService,
    public tags:TagsProcessingService,
    public quizes:QuizesProcessingService,
    public userSettings:SettingsProcessingService
  ) {
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
        this.events.onRequestTagsSync.subscribe(tags => this.onRequestTagsSync(tags))
        this.events.onRequestQuestionsSync.subscribe(questions => this.onRequestQuestionsSync(questions))
        this.events.onRequestQuizesSync.subscribe(quizes => this.onRequestQuizesSync(quizes))
        this.events.onRequestRecordRemovalSync.subscribe(record => this.onRequestRecordRemoval(record))
        this.events.onSynchronizedDatabase.subscribe(outcome => this.onSynchronizedDatabase(outcome))
        this.events.onLoginOutcome.subscribe(outcome => this.onLoginOutcome(outcome))
        this.events.onSessionValid.subscribe(() => this.onSessionValid())
      }












  private onRequestTagsSync(tags) {
    try { this._onRequestTagsSync(tags) }
    catch (error) {
      this.events.onError.next({ signature: 'signatureString', details: error })
    }
  }




      private _onRequestTagsSync(tags) {
        let promises = [ ]
        tags.forEach(tag => promises.push(this.tags.save(tag)))
        Promise.all(promises)
          .then(result => this.onSyncTagsSuccess(result))
          .catch(error => this.onSyncTagsFailure(error))
      }




          private onSyncTagsFailure(error) {  console.error('error-975aec77-c6b7-423a-89c9-d004b731c543', error)
            this.connection.online = false
          }




          private onSyncTagsSuccess(results) {
            this.handleSyncResults(results)
          }













  private onRequestQuestionsSync(questions) {
    try { this._onRequestQuestionsSync(questions) }
    catch (error) {
      this.events.onError.next({ signature: '7c5e5e31-156e-4665-b9ea-03861e6adaf6', details: error })
    }
  }




      private _onRequestQuestionsSync(questions) {
        let promises = [ ]
        questions.forEach(question => promises.push(this.questions.save(question)))
        Promise.all(promises)
          .then(result => this.onSyncQuestionsSuccess(result))
          .catch(error => this.onSyncQuestionsFailure(error))
      }




          private onSyncQuestionsFailure(error) {  console.error('error-2bc82dc2-263d-49d3-9040-786c67addf07', error)
            this.connection.online = false
          }




          private onSyncQuestionsSuccess(results) {
            this.handleSyncResults(results)
          }












  private onRequestQuizesSync(quizes) {
    try { this._onRequestQuizesSync(quizes) }
    catch (error) {
      this.events.onError.next({ signature: '807e346d-bcd3-454e-9ff5-7aa83f5f6ae7', details: error })
    }
  }




      private _onRequestQuizesSync(quizes) {
        let promises = [ ]
        quizes.forEach(quiz => promises.push(this.quizes.save(quiz)))
        Promise.all(promises)
          .then(result => this.onSyncQuizesSuccess(result))
          .catch(error => this.onSyncQuizesFailure(error))
      }




          private onSyncQuizesFailure(error) {  console.error('error-883a02a7-bace-4e0d-818f-6940589a9bd2', error)
            this.connection.online = false
          }




          private onSyncQuizesSuccess(results) {
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
                  this.ui.channelSecondary({ message: 'No connection, now in offline mode.', state: 'error' })
                  this.hasNotifiedOffline = true
                }, interval)
              }




          private notifyUserTheyAreOnline() {
            this.ui.channelSecondary({ message: 'You are back online, synchronizing records.', state: 'success' })
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
        // if (!sessionStorage.getItem('acctId')) this.router.navigate(['home'])
        if (!sessionStorage.getItem('acctId')) return
        else {
          this.tags.loadRecords()
          this.questions.loadRecords()
          this.quizes.loadRecords()
          this.devices.loadRecords()
          this.loadSettings(sessionStorage.getItem('acctId'))
        }
      }




          private loadSettings(accountId) {
            this.api.settings.getRecords(accountId)
              .then(result => this.onLoadSettings(result))
          }




              private onLoadSettings(result) {
                this.offline.createTable({ table: `${ sessionStorage.getItem('acctId') }.settings`, records: result.details.Items[0] })
                    this.userSettings.records = result.details.Items
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
    if (!outcome.success) this.router.navigate(['home'])
    else this.router.navigate(['dashboard'])
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
