import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Question } from 'src/assets/models/Question.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SiteService } from 'src/app/services/site/site.service';
import { copyOf } from 'src/assets/utilities/copyOf';
import { capitalize } from 'src/assets/utilities/capitalize';


@Component({
  selector: 'app-questionaire-boolean',
  templateUrl: './questionaire-boolean.component.html',
  styleUrls: ['./questionaire-boolean.component.scss'],
})
export class QuestionaireBooleanComponent implements OnInit, OnChanges {

  @Input() question:Question
  @Input() mode:'exam'|'grade'
  @Output() output:EventEmitter<{ userAnswer:boolean }|{ correct:boolean }>
  public form:FormGroup
  public correct:boolean
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
      this.site.events.onError.next({ signature: '96992812-68be-47ea-afb5-a8efe6cae81e', details: error })
    }
  }












  ionViewWillEnter() {
    try { this.createForm() }
    catch (error) {
      this.site.events.onError.next({ signature: '7fdba440-06f4-4f72-a1c9-fa878d4344b9', details: error })
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
      userAnswer: new FormControl(`${ this.question.userAnswer }`, { validators: [Validators.required ]}),
      correct: new FormControl(this.question.correct, { validators: [Validators.required] })
    })
  }












  public onSubmitButtonClick() {
    try { this._onSubmitButtonClick() }
    catch (error) {
      this.site.events.onError.next({ signature: 'd5a74c80-3dfc-4536-b310-4e474bbe482c', details: error })
    }
  }



      private _onSubmitButtonClick() {
        if (this.mode === 'exam') this.output.emit({ userAnswer: this.form.controls.userAnswer.value })
        else this.output.emit({ correct: this.form.controls.correct.value.value })
      }












  public get uiAnswer() {
    try { return this._uiAnswer() }
    catch (error) {
      this.site.events.onError.next({ signature: '4d76bf14-c449-4ccb-a2dd-148525406d5b', details: error })
    }
  }




      private _uiAnswer() {
        return capitalize(this.question.userAnswer)
      }












  public get uiUserAnswer() {
    try { return this._uiUserAnswer() }
    catch (error) {
      this.site.events.onError.next({ signature: '3fb36f80-2397-48be-949d-f3ce8ad85582', details: error })
    }
  }




      private _uiUserAnswer() {
        return capitalize(this.question.userAnswer)
      }
}
