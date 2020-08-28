import { Component } from '@angular/core';
import { SiteService } from 'src/app/services/site/site.service';
import { ExamProcessingService } from 'src/app/services/processors/exam-processing/exam.processing.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { QuizesProcessingService } from 'src/app/services/processors/quizes-processing/quizes.processing.service';
import { ConciseComponent } from 'src/assets/classes/ConciseComponent.class';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.page.html',
  styleUrls: ['./exam.page.scss'],
})
export class ExamPage extends ConciseComponent {

  id:string


  constructor(
    public site:SiteService,
    public examService:ExamProcessingService,
    public quizService:QuizesProcessingService,
    protected route:ActivatedRoute
  ) {
    super(site)
  }












  protected loadRecord(paramMap:ParamMap) {
    try { this._loadRecord(paramMap) }
    catch (error) {
      this.onError({ signature: '62f5c1ce-0d60-4923-a81f-ef6fa7866471', details: error })
    }
  }




      private _loadRecord(paramMap) {
        this.id = paramMap.get('id')
        let quiz = this.quizService.getId(this.id)
        this.examService.loadExam(quiz)
      }












  public onAnswer(event) {
    try { this._onAnswer(event) }
    catch (error) {
      this.onError({ signature: '6926657c-3749-429d-b8b5-4bc54cc0552f', details: error })
    }
  }




      private _onAnswer(event) {
        this.examService.questions[this.examService.index].userAnswer = event.userAnswer
        if (this.examService.index < this.examService.questions.length - 1) this.examService.index++
        else this.examIsComplete()
      }




          private examIsComplete() {
            this.examService.beginReviewMode()
            this.site.router.navigate(['review'])
          }












  public get isTextQuestion() {
    try { return this._isTextQuestion() }
    catch (error) {
      this.onError({ signature: 'ae536503-6f4e-4a7d-908e-54e45ee7355b', details: error })
    }
  }




      private _isTextQuestion() {
        return (this.examService.questions[this.examService.index].type === 'text')
      }












  public get isBooleanQuestion() {
    try { return this._isBooleanQuestion() }
    catch (error) {
      this.onError({ signature: '89fa56f2-8d8a-4e04-b8c6-bc2eabfb02ba', details: error })
    }
  }




      private _isBooleanQuestion() {
        return (this.examService.questions[this.examService.index].type === 'boolean')
      }












  public get isMultipleQuestion() {
    try { return this._isMultipleQuestion() }
    catch (error) {
      this.onError({ signature: '43dc4f63-2b12-4e8f-b9ca-16be2808f6a0', details: error })
    }
  }




      private _isMultipleQuestion() {
        return (this.examService.questions[this.examService.index].type === 'multiple')
      }












  public get question() {
    try { return this._question() }
    catch (error) {
      this.onError({ signature: '8aa343bf-8dcf-47c7-9f44-10d9a063c02f', details: error })
    }
  }




      private _question() {
        return this.examService.questions[this.examService.index]
      }

}
