import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question } from 'src/assets/models/Question.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SiteService } from 'src/app/services/site/site.service';
import { copyOf } from 'src/assets/utilities/copyOf';


@Component({
  selector: 'app-questionaire-multiple-choice',
  templateUrl: './questionaire-multiple-choice.component.html',
  styleUrls: ['./questionaire-multiple-choice.component.scss'],
})
export class QuestionaireMultipleChoiceComponent implements OnInit {

  @Input() question:Question
  @Input() mode:'exam'|'grade'
  @Output() output:EventEmitter<{ userAnswer:string }|{ correct:boolean }>
  public form:FormGroup
  public correct:boolean|string
  public correctOptions:{ name:string, value:boolean }[]
  private original:Question


  constructor(
    public site:SiteService
  ) {
    this.output = new EventEmitter()
    this.setCorrectOptions()
  }




      private setCorrectOptions() {
        this.correctOptions = [
          { name: 'Correct', value: true },
          { name: 'Incorrect', value: false }
        ]
      }












  ngOnInit() {
    try { this._init() }
    catch (error) {
      this.site.events.onError.next({ signature: '3793c080-67ea-44e4-84be-469ce95ae7a0', details: error })
    }
  }












  ionViewWillEnter() {
    try { this._init() }
    catch (error) {
      this.site.events.onError.next({ signature: '9a61a14c-0ae0-4160-a4e1-859e6cc7d9b3', details: error })
    }
  }












  private _init() {
    this.original = copyOf(this.question)
    this.createForm()
  }












  ngOnChanges() {
    if (!this.original) return
    if (this.question.id != this.original.id) this.ngOnInit()
  }












  private createForm() {
    this.form = new FormGroup({
      answer: new FormControl(null, { validators: [Validators.required] }),
      correct: new FormControl(null)
    })
  }












  public onSubmitButtonClick() {
    try { this._onSubmitButtonClick() }
    catch (error) {
      this.site.events.onError.next({ signature: '115409ef-0ba2-4659-bf6b-bcaebcad4040', details: error })
    }
  }




      private _onSubmitButtonClick() {
        if (this.mode === 'exam') this.output.emit({ userAnswer: this.form.controls.answer.value })
        else this.output.emit({ correct: this.form.value.correct.value })
      }












  public get correctAnswer() {
    try { return this._correctAnswer() }
    catch (error) {
      this.site.events.onError.next({ signature: '47409f1e-627c-4d68-b1d6-42165a3944f5', details: error })
    }
  }




      private _correctAnswer() {
        let correctRecord = this.question.options.filter(question => question.correct)[0] as any
        return correctRecord.answer
      }

}
