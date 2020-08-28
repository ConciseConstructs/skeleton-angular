import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question } from 'src/assets/models/Question.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EventsService } from 'src/app/services/site/events/events.service';


@Component({
  selector: 'app-questionaire-multiple-answer',
  templateUrl: './questionaire-multiple-answer.component.html',
  styleUrls: ['./questionaire-multiple-answer.component.scss'],
})
export class QuestionaireMultipleAnswerComponent implements OnInit {

  @Input() question:Question
  @Output() output:EventEmitter<{ answer:string }>
  public form:FormGroup
  private answer:string


  constructor(
    private events:EventsService
  ) {
    this.output = new EventEmitter()
  }












  ngOnInit() {
    try { this.createForm() }
    catch (error) {
      this.events.onError.next({ signature: 'a28b87a5-6807-4d4b-a9f4-b1fd86aaa60c', details: error })
    }
  }












  ionViewWillEnter() {
    try { this.createForm() }
    catch (error) {
      this.events.onError.next({ signature: '2309b13d-a789-436e-a786-071664910149', details: error })
    }
  }












  private createForm() {
    this.form = new FormGroup({
      answer: new FormControl(null, { validators: [Validators.required ]})
    })
  }












  public onSubmitButtonClick() {
    try { this._onSubmitButtonClick() }
    catch (error) {
      this.events.onError.next({ signature: 'f68e6ece-ba79-4726-ba39-aa5bb41d2bc6', details: error })
    }
  }




      private _onSubmitButtonClick() {
        this.output.emit({ answer: this.answer })
      }

}
