import { Component } from '@angular/core';
import { SiteService } from 'src/app/services/site/site.service';
import { ExamProcessingService } from 'src/app/services/processors/exam-processing/exam.processing.service';
import { ConciseComponent } from 'src/assets/classes/ConciseComponent.class';
import { ScheduleProcessingService } from 'src/app/services/processors/schedule-processing/schedule-processing.service';
import { JobsService } from 'src/app/services/site/jobs/jobs.service';
import * as moment from 'moment'


@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage extends ConciseComponent {


  constructor(
    public site:SiteService,
    public examService:ExamProcessingService,
    private scheduleProcessor:ScheduleProcessingService,
    private jobsService:JobsService,
  ) {
    super(site)
    if (this.examService.exam.quiz.schedule) this.scheduleNextExam()
  }












  private scheduleNextExam() {
    try { this._scheduleNextExam() }
    catch (error) {
      this.onError({ signature: '57605f1a-7b9a-44c6-8d4d-8f4637ecbe78', details: error })
    }
  }




      private _scheduleNextExam() {
        let nextQuizDate, schedule = this.examService.exam.quiz.schedule
        if (schedule.unit === 'day') nextQuizDate = this.scheduleProcessor.nextQuizForDaysUnit(schedule)
        else if (schedule.unit === 'month') nextQuizDate = this.scheduleProcessor.nextQuizForMonthsUnit(schedule)
        else nextQuizDate = this.scheduleProcessor.nextQuizForWeekdayUnit(schedule)
        if (nextQuizDate.valueOf() < new Date().valueOf()) nextQuizDate = this.addTime(nextQuizDate, this.examService.exam.quiz.schedule)
        this.save(nextQuizDate)
      }




          private save(nextQuizDate) {
            let nextQuizNotificationParams = this.createNextQuizNotificationParams(nextQuizDate)
            let job = this.jobsService.pushNotificationJob.make(nextQuizNotificationParams)
            this.jobsService.schedule(job)
              .then(result => this.onScheduleNextQuizSuccess(result))
              .catch(error => this.onScheduleNextQuizFailure(error))
          }




              private createNextQuizNotificationParams(nextQuizDate) {
                return {
                  accountId: this.site.session.acctId,
                  dueAt: nextQuizDate.valueOf(),
                  name: this.examService.exam.quiz.name,
                  to: this.site.devices.records.map(device => device.fcmToken),
                  title: `Quiz Due`,
                  body: `Your "${ this.examService.exam.quiz.name }" is due.`,
                  boundTo: this.examService.exam.quiz.id
                }
              }




              private onScheduleNextQuizFailure(error) {  console.error('error-cdb878eb-964c-4329-a343-188e73f7a9ca', error)
                this.site.ui.channelSecondary({ message: 'Unable to schedule next quiz.', state: 'error' })
              }




              private onScheduleNextQuizSuccess(result) {
                if (!result.success) this.onScheduleNextQuizFailure(result)
                // else do nothing.
              }




          private addTime(nextQuizDate, schedule) {
            let date
            if (schedule.unit === 'day' || schedule.unit === 'month') date = moment(nextQuizDate).add(schedule.rate, `${ schedule.unit }s`).valueOf()
            else date = moment(nextQuizDate).add(7, 'days').valueOf()
            return date
          }












  public onNavigateButtonClick() {
    try { this._onNavigationButtonClick() }
    catch (error) {
      this.onError({ signature: 'bd80ee9d-ab95-4622-8649-de379210b14d', details: error })
    }
  }




      private _onNavigationButtonClick() {
        this.site.router.navigate(['dashboard'])
      }












  public get percentCorrect() {
    try { return this._percentCorrect() }
    catch (error) {
      this.onError({ signature: '4ef44efc-b306-4792-a233-dd9442af712d', details: error })
    }
  }




      private _percentCorrect() {
        let correctCount = this.examService.questions.filter(question => question.correct === true).length
        let percent = (correctCount / this.examService.questions.length) * 100
        return Math.round(percent)
      }

}
