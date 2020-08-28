import { Injectable } from '@angular/core';
import { DataModelProcessingService } from 'src/assets/classes/DataModelProcessingService.class';
import { EventsService } from '../../site/events/events.service';
import { ApiService } from '../../site/api/api.service';
import { OfflineService } from '../../site/offline/offline.service';
import { Quiz } from 'src/assets/models/Quiz.model';
import { Question } from 'src/assets/models/Question.model';
import { JobsService } from '../../site/jobs/jobs.service';
import { DevicesProcessingService } from '../devices/devices-processing.service';
import { SettingsProcessingService } from '../settings-processing/settings-processing.service'
import { SettingsService } from '../../site/settings/settings.service'


@Injectable({
  providedIn: 'root'
})
export class QuizesProcessingService extends DataModelProcessingService {

  public quiz:Quiz


  constructor(
    protected events:EventsService,
    protected api:ApiService,
    protected offline:OfflineService,
    protected jobsService:JobsService,
    protected devices:DevicesProcessingService,
    protected accountSettings:SettingsProcessingService,
    protected siteSettings:SettingsService
  ) {
    super()
  }












  protected hookConstructorPre() {
    this.modelName = 'quizes'
    this.Model = Quiz
    this.onNewDataEmitterName = 'onNewQuizes'
  }












  public createNew() {
    try { this._createNew() }
    catch (error) {
      this.events.onError.next({ signature: '4b86bf9d-2ef3-4a58-9e5a-16b5419d9df5', details: error })
    }
  }




      private _createNew() {
        this.quiz = new Quiz()
      }












  public set tags(tagIds:string[]) {
    try { this._tags(tagIds) }
    catch (error) {
      this.events.onError.next({ signature: '609029a5-eba5-4479-ae88-8797cdedb772', details: error })
    }
  }




      private _tags(tagIds) {
        this.quiz.links.tags = { }
        tagIds.forEach(tagId => this.quiz.links.tags[tagId] = null)
      }












  public set questions(questions:Question[]) {
    try { this._questions(questions) }
    catch (error) {
      this.events.onError.next({ signature: 'e8cd4bd9-1b40-468e-b629-05101b926fd7', details: error })
    }
  }




      private _questions(questions) {
        this.quiz.links.questions = { }
        questions.forEach(question => this.quiz.links.questions[question.id] = null)
      }












  public setSchedule(schedule:any) {
    try { this._setSchedule(schedule) }
    catch (error) {
      this.events.onError.next({ signature: 'bcfa11d7-e25b-453c-b664-5df2d3649d3c', details: error })
    }
  }




      private _setSchedule(schedule) {
        this.quiz.schedule = schedule
      }











  protected hookOnUpdateRecordSuccessPre(result, record) {
    this.scheduleQuiz(record)
  }












  protected hookOnSaveRecordSuccessPre(result, record) {
    this.scheduleQuiz(record)
  }












  private scheduleQuiz(record) {
    try { this._scheduleQuiz(record) }
    catch (error) {
      this.events.onError.next({ signature: 'fc04f5db-e1a9-49f4-b225-546e5b68630a', details: error })
    }
  }




      private _scheduleQuiz(record) {
        if (!record.schedule.rate) return
        let pushNotificationJob = this.makePushNotificationJob(record)
        let promises = [this.jobsService.schedule(pushNotificationJob)]
        let sendEmailJob = this.makeSendEmailJob(record)
        if (sendEmailJob) promises.push(this.jobsService.schedule(sendEmailJob))
        Promise.all(promises)
          .then(result => this.onScheduleQuizSuccess(result))
          .catch(error => this.onScheduleQuizFailure(error))
      }




          private makePushNotificationJob(record) {
            let params = { } as any
            params.id = `${ record.id }-${ record.schedule.nextQuizUTC }`
            params.dueAt = record.schedule.nextQuizUTC
            params.accountId = sessionStorage.getItem('acctId')
            params.title = `Quiz Due`
            params.body = `Your ${ record.name } quiz is due.`
            params.to = [ ]
            this.devices.records.forEach(device => params.to.push(device.fcmToken))
            params.schedule = record.schedule
            params.boundTo = record.id
            return this.jobsService.pushNotificationJob.make(params)
          }




          private makeSendEmailJob(record) {
            if (!this.accountSettings.emailNotifications) return
            let params = { } as any
            params.id = `${ record.id }-${ record.schedule.nextQuizUTC }`
            params.dueAt = record.schedule.nextQuizUTC
            params.accountId = sessionStorage.getItem('acctId')
            params.toAddresses = [this.accountSettings.email]
            params.from = this.siteSettings.values.email
            params.title = `Quiz Due`
            params.body = `Your ${ record.name } quiz is due.`
            params.boundTo = record.id
            return this.jobsService.sendEmailJob.make(params)
          }




          private onScheduleQuizFailure(error) {  console.error('error-ae0fe089-e33b-4d61-8afb-9dd0de7f73b4', error)
            // Do nothing just log error for debugging.
          }




          private onScheduleQuizSuccess(results:any[]) {
            if (results.some(result => result.success === false)) this.onScheduleQuizFailure(results)
            // Else do nothing.
          }

}
