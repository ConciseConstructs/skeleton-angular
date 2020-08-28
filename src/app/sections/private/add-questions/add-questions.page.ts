import { Component } from '@angular/core';
import { SiteService } from 'src/app/services/site/site.service';
import { QuestionsProcessingService } from 'src/app/services/processors/questions-processing/questions.processing.service';
import { Location } from '@angular/common';
import { ConciseComponent } from 'src/assets/classes/ConciseComponent.class';


@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.page.html',
  styleUrls: ['./add-questions.page.scss'],
})
export class AddQuestionsPage extends ConciseComponent {

  public questionOptions:any
  public questions:any
  public record:any


  constructor(
    public site:SiteService,
    private location:Location,
    private questionsService:QuestionsProcessingService,
  ) {
    super(site)
  }












  public ngOnInit() {
    try { this.preparePage() }
    catch (error) {
      this.onError({ signature: '365c8103-c5d0-4fba-a2c6-cb7383e25b25', details: error })
    }
  }












  public ionViewWillEnter() {
    try { this.preparePage() }
    catch (error) {
      this.onError({ signature: 'e71d3109-f5fc-46a1-948e-862e8116ff57', details: error })
    }
  }












  private preparePage() {
    this.record = this.site.shared['quiz-form-record']
    this.questionOptions = this.questionsService.records
    this.questionOptions.forEach(question => question.selected = this.setProperCheckboxState(question))
  }




      private setProperCheckboxState(examineQuestion) {
        if (!this.record.questions) return false
        if (this.record.questions.find(question => question.id === examineQuestion.id)) return true
        else return false
      }












  public setRowColor(index) {
    try { return this._setRowColor(index) }
    catch (error) {
      this.onError({ signature: '0cdab927-7258-401a-bcc7-c8439a42cdf2', details: error })
    }
  }




      private _setRowColor(index) {
        if (index % 2 == 0) return 'even'
        else return 'odd'
      }












  public onToggleQuestion(option) {
    try { this._onToggleQuestion(option) }
    catch (error) {
      this.onError({ signature: 'a0a977d0-5ee5-46a9-a1b8-7169244d2a7a', details: error })
    }
  }




      private _onToggleQuestion(option) {
        if (this.site.renderFor === 'mobile') this.handleUiUpdateForMobileComponent(option)
        this.setSelectedQuestions()
      }




          private handleUiUpdateForMobileComponent(option) {  // JSON used for workaround with Ionic bug.  https://github.com/ionic-team/ionic/issues/20346
            this.questionOptions = JSON.parse(JSON.stringify(this.questionOptions))
            let question = this.questionOptions.find(questionOption => questionOption.id === option.id)
            question.selected = !question.selected
          }




          private setSelectedQuestions() {
            let selectedQuestions = this.questionOptions.filter(question => question.selected)
            this.record.questions = selectedQuestions.map(question => question.id)
          }












  public onBackButtonClick() {
      try { this.location.back() }
      catch (error) {
        this.onError({ signature: '500bb5a9-8e22-49bb-9d54-13d99f278eec', details: error })
      }
  }

}
