import { Component } from '@angular/core';
import { SiteService } from 'src/app/services/site/site.service';
import { QuizesProcessingService } from 'src/app/services/processors/quizes-processing/quizes.processing.service';
import { Quiz } from 'src/assets/models/Quiz.model';
import { ConciseComponent } from 'src/assets/classes/ConciseComponent.class';
import { Breadcrumbs } from 'src/assets/types/Breadcrumbs.type';


@Component({
  selector: 'app-new-quiz',
  templateUrl: './new-quiz.page.html',
  styleUrls: ['./new-quiz.page.scss'],
})
export class NewQuizPage extends ConciseComponent {

  public emptyRecord:Quiz
  public record:Quiz
  public breadcrumbs:Breadcrumbs


  constructor(
    public site:SiteService,
    private service:QuizesProcessingService
  ) {
    super(site)
  }












  public ionViewWillEnter() { }  // Overwrites/voids inherited ionViewWillEnter to allow site.shared to not be reset on entry












  protected init() {
    try { this._init() }
    catch (error) {
      this.onError({ signature: '4842858e-26c9-4079-9573-83b7177fdf9a', details: error })
    }
  }




      private _init() {
        this.record = this.service.createNewInstance()
        this.backUrl = 'dashboard'
        this.createEmptyRecord()
        this.createBreadcrumbs()
      }

      private createBreadcrumbs() {
        this.breadcrumbs = [
          { label: 'New', url: ['new'] },
          { label: 'Quiz' }
        ]
      }












  public createEmptyRecord() {
    try { this._createEmptyRecord() }
    catch (error) {
      this.onError({ signature: '3f6abf85-ccc5-48d6-af19-f38b4fb57d2f', details: error })
    }
  }




      private _createEmptyRecord() {
        this.site.shared['quiz-form-record'] = this.record
      }













  public onNewQuiz(event) {
    try { this._onNewQuiz(event) }
    catch (error) {
      this.onError({ signature: '02ab71bb-29ed-4305-b956-d502006ed1a6', details: error })
    }
  }




      private _onNewQuiz(event) {
        this.service.save(event)
          .then(result => this.onSaveQuizSuccess(result))
          .catch(error => this.onSaveQuizFailure(error))
        delete this.site.shared['quiz-form-record']
      }




          private onSaveQuizFailure(error) {  console.error('error-dac489de-3749-4c5e-a3da-411e82660ec8', error)
            this.site.ui.alert(this.site.settings.messages.offlineRecordSaved)
            this.navigateBack()
          }




          private onSaveQuizSuccess(result) {
            if (!result.success) this.onSaveQuizFailure(result)
            else {
              this.site.ui.channelPrimary({ state: 'success', message: this.site.settings.messages.recordSaved })
              this.navigateBack()
            }
          }

}
