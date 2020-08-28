import { Component } from '@angular/core';
import { SiteService } from 'src/app/services/site/site.service';
import { ExamProcessingService } from 'src/app/services/processors/exam-processing/exam.processing.service';
import { ConciseComponent } from 'src/assets/classes/ConciseComponent.class';
import { copyOf } from 'src/assets/utilities/copyOf';

@Component({
  selector: 'app-review',
  templateUrl: './review.page.html',
  styleUrls: ['./review.page.scss'],
})
export class ReviewPage extends ConciseComponent {

  public finished:boolean


  constructor(
    public site:SiteService,
    public examService:ExamProcessingService
  ) {
    super(site)
  }












  public onGradeAnswer(event) {
    try { this._onGradeAnswer(event) }
    catch (error) {
      this.onError({ signature: '549cd151-8e56-4cb6-a607-e2cf56bc86e6', details: error })
    }
  }




      private _onGradeAnswer(event) {
        this.examService.questions[this.examService.index].correct = event.correct
        if (this.examService.index < this.examService.questions.length) this.examService.index++
        if (this.examService.index === this.examService.questions.length) this.isFinished()
      }












  private isFinished() {
    try { this._isFinished() }
    catch (error) {
      this.onError({ signature: 'signatureString', details: error })
    }
  }




      private _isFinished() {
        this.examService.processAnswersForNextTime()
        this.site.router.navigate(['results'])
      }












  public get isTextQuestion() {
    try { return this._isTextQuestion() }
    catch (error) {
      this.onError({ signature: 'c200fdfd-bbbc-45b4-8863-1adb719bc54d', details: error })
    }
  }




      private _isTextQuestion() {
        if (!this.examService.questions[this.examService.index]) return
        else return (this.examService.questions[this.examService.index].type === 'text')
      }












  public get isBooleanQuestion() {
    try { return this._isBooleanQuestion() }
    catch (error) {
      this.onError({ signature: 'c0109af4-c23a-4dac-b3f5-4a5ae1ce9e4e', details: error })
    }
  }




      private _isBooleanQuestion() {
        if (!this.examService.questions[this.examService.index]) return
        else return (this.examService.questions[this.examService.index].type === 'boolean')
      }












  public get isMultipleQuestion() {
    try { return this._isMultipleQuestion() }
    catch (error) {
      this.onError({ signature: 'dd8bb9a9-f102-4921-9ced-36c9e568095a', details: error })
    }
  }




      private _isMultipleQuestion() {
        if (!this.examService.questions[this.examService.index]) return
        else return (this.examService.questions[this.examService.index].type === 'multiple')
      }












  public get question() {
    try { return copyOf(this._question()) }
    catch (error) {
      this.onError({ signature: '6f77cc22-1d5e-4f37-9b5f-125ad402b995', details: error })
    }
  }




      private _question() {
        if (!this.examService.questions[this.examService.index]) return
        else return this.examService.questions[this.examService.index]
      }

}
