import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Question } from 'src/assets/models/Question.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SiteService } from 'src/app/services/site/site.service';
import { id } from 'src/assets/utilities/shortId';
import { copyOf } from 'src/assets/utilities/copyOf';


@Component({
  selector: 'app-questionaire-text',
  templateUrl: './questionaire-text.component.html',
  styleUrls: ['./questionaire-text.component.scss'],
})
export class QuestionaireTextComponent implements OnInit, OnChanges {

  @Input() question:Question
  @Input() mode:'exam'|'grade'
  @Output() output:EventEmitter<{ userAnswer:string }|{ correct:boolean }>
  private original:Question
  public form:FormGroup
  public correct:boolean|string
  public correctOptions:{ name:string, value:boolean }[]
  public random // delete


  constructor(
    public site:SiteService
  ) {
    this.output = new EventEmitter()
    this.setCorrectOptions()
  }




      private setCorrectOptions() {
        this.correctOptions = [
          { name: 'Correct', value: true },
          { name: 'Incorrect', value: false },
        ]
      }












  ngOnInit() {
    try { this._init() }
    catch (error) {
      this.site.events.onError.next({ signature: '38198b4f-42d2-475f-856a-15e414d30f0c', details: error })
    }
  }












  ionViewWillEnter() {
    try { this._init() }
    catch (error) {
      this.site.events.onError.next({ signature: 'f8f6396c-fbee-44fe-bd3c-d3b28d206c46', details: error })
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
      answer: new FormControl(this.question.userAnswer, { validators: [Validators.required, Validators.minLength(1)] }),
      correct: new FormControl(null)
    })
  }












  public onSubmitButtonClick() {
    try { this._onSubmitButtonClick() }
    catch (error) {
      this.site.events.onError.next({ signature: '1481985e-a460-4946-ba03-dc8862617c2d', details: error })
    }
  }




      private _onSubmitButtonClick() {
        if (this.mode === 'exam') this.output.emit({ userAnswer: this.form.controls.answer.value })
        else this.output.emit({ correct: this.form.value.correct.value })
      }

}
