import { Component, OnInit } from '@angular/core';
import { SiteService } from 'src/app/services/site/site.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { QuizesProcessingService } from 'src/app/services/processors/quizes-processing/quizes.processing.service';
import { Quiz } from 'src/assets/models/Quiz.model';
import { ConciseComponent } from 'src/assets/classes/ConciseComponent.class';
import { Breadcrumbs } from 'src/assets/types/Breadcrumbs.type';


@Component({
  selector: 'app-edit-quiz',
  templateUrl: './edit-quiz.page.html',
  styleUrls: ['./edit-quiz.page.scss'],
})
export class EditQuizPage extends ConciseComponent {

  public quiz:Quiz
  public breadcrumbs:Breadcrumbs

  constructor(
    public site:SiteService,
    protected route:ActivatedRoute,
    private quizesService:QuizesProcessingService
  ) {
    super(site)
  }












  protected init() {
    try { this._init() }
    catch (error) {
      this.onError({ signature: '6a4e24c8-29b7-4ae0-a0bd-226c7d071bb9', details: error })
    }
  }




      private _init() {
        this.backUrl = 'search'
        this.createBreadcrumbs()
      }




          private createBreadcrumbs() {
            this.breadcrumbs = [
              { label: 'Browse', url: ['search'] },
              { label: 'Edit' }
            ]
          }











  protected loadRecord(paramMap:ParamMap) {
    try { this._loadRecord(paramMap) }
    catch (error) {
      this.onError({ signature: '2b80597a-ba31-4c0e-a340-28a581ba6ab1', details: error })
    }
  }




      private _loadRecord(paramMap) {
        if (this.hasASharedFormRecord && this.sharedRecordIsTheSame(paramMap)) this.reloadSharedForm()
        else this.shareNewForm(paramMap)
      }




          private get hasASharedFormRecord() {
            return (this.site.shared['quiz-form-record'])
          }




          private sharedRecordIsTheSame(paramMap:ParamMap) {
            return (this.site.shared['quiz-form-record'].id === paramMap.get('id'))
          }




          private reloadSharedForm() {
            this.quiz = this.site.shared['quiz-form-record']
          }




          private shareNewForm(paramMap:ParamMap) {
            this.quiz = this.quizesService.getId(paramMap.get('id'))
            this.site.shared['quiz-form-record'] = this.quiz
          }












  public onUpdateQuiz(event) {
    try { this._onUpdateQuiz(event) }
    catch (error) {
      this.onError({ signature: '0036d8ab-69ba-4cdb-9ed1-9fcc307a0555', details: error })
    }
  }




      private _onUpdateQuiz(event) {
        this.quizesService.update(event)
          .then(result => this.onUpdateQuizSuccess(result))
          .catch(error => this.onUpdateQuizFailure(error))
        delete this.site.shared['quiz-form-record']
      }




          private onUpdateQuizFailure(error) {  console.error('error-793ea508-5860-41ce-bd7e-3f2868a86ab3', error)
            this.site.ui.alert(this.site.settings.messages.offlineRecordSaved)
            this.navigateBack()
          }




          private onUpdateQuizSuccess(result) {
            if (!result.success) this.onUpdateQuizFailure(result)
            else {
              this.site.ui.channelPrimary({ state: 'success', message: this.site.settings.messages.recordSaved })
              this.navigateBack()
            }
          }

}
