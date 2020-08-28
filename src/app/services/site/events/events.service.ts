import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs'
import { Quiz } from 'src/assets/models/Quiz.model';
import { Tag } from 'src/assets/models/Tag.model';
import { Question } from 'src/assets/models/Question.model';
import { StandardReturn } from 'src/assets/types/StandardReturn.type';
import { Settings } from 'src/assets/models/Settings.model';
import { ScreenSummary } from 'src/assets/types/ScreenSummary.type';
import { UiFeedback } from 'src/assets/types/UiFeedback.type';


@Injectable({
  providedIn: 'root'
})
export class EventsService {

  public onScreenSize:BehaviorSubject<ScreenSummary>
  public onAuthProfileCreateOutcome:Subject<StandardReturn>
  public onLoginProfileCreateOutcome:Subject<StandardReturn>
  public onSignUpOutcome:Subject<StandardReturn>
  public onLoginOutcome:Subject<StandardReturn>
  public onAccountId:Subject<string>
  public onCreateDatabase:Subject<StandardReturn>
  public onSessionValid:Subject<undefined>
  public onNewQuestions:BehaviorSubject<Question[]>
  public onNewQuizes:BehaviorSubject<Quiz[]>
  public onNewTags:BehaviorSubject<Tag[]>
  public onNewSettings:BehaviorSubject<Settings>
  public onConnectionChange:BehaviorSubject<StandardReturn>
  public onRequestTagsSync:Subject<Tag[]>
  public onRequestTagsSyncOutcome:Subject<StandardReturn>
  public onRequestQuestionsSync:Subject<Question[]>
  public onRequestQuestionsSyncOutcome:Subject<StandardReturn>
  public onRequestQuizesSync:Subject<Quiz[]>
  public onRequestQuizesSyncOutcome:Subject<StandardReturn>
  public onRequestRecordRemovalSync:Subject<{ table:string, id:string }>
  public onRequestRecordRemovalSyncOutcome:Subject<StandardReturn>
  public onSynchronizedDatabase:Subject<StandardReturn>
  public onChannelPrimary:Subject<UiFeedback>
  public onChannelSecondary:Subject<UiFeedback>
  public onDeviceInfo:BehaviorSubject<{ manufacturer:string, model:string, platform:string, operatingSystem:string, osVersion:string, uuid:string, fcmToken:string, }>
  public onNewDevices:Subject<StandardReturn>
  public onError:Subject<{ signature:string, details:any }>


  constructor() {
    this.createEvents()
  }




      private createEvents() {
        this.onScreenSize = new BehaviorSubject({ device: 'pc', orientation: 'portrait', size: 'medium' })
        this.onAuthProfileCreateOutcome = new Subject()
        this.onLoginProfileCreateOutcome = new Subject()
        this.onSignUpOutcome = new Subject()
        this.onLoginOutcome = new Subject()
        this.onAccountId = new Subject()
        this.onCreateDatabase = new Subject()
        this.onSessionValid = new Subject()
        this.onNewQuestions = new BehaviorSubject(null)
        this.onNewQuizes = new BehaviorSubject(null)
        this.onNewTags = new BehaviorSubject(null)
        this.onNewSettings = new BehaviorSubject(null)
        this.onConnectionChange = new BehaviorSubject({ success: true, details: 'Initial state is presumed online' })
        this.onRequestTagsSync = new Subject()
        this.onRequestTagsSyncOutcome = new Subject()
        this.onRequestQuestionsSync = new Subject()
        this.onRequestQuestionsSyncOutcome = new Subject()
        this.onRequestQuizesSync = new Subject()
        this.onRequestQuizesSyncOutcome = new Subject()
        this.onRequestRecordRemovalSync = new Subject()
        this.onRequestRecordRemovalSyncOutcome = new Subject()
        this.onSynchronizedDatabase = new Subject()
        this.onChannelPrimary = new Subject()
        this.onChannelSecondary = new Subject()
        this.onDeviceInfo = new BehaviorSubject(null)
        this.onNewDevices = new Subject()
        this.onError = new Subject()
      }

}
