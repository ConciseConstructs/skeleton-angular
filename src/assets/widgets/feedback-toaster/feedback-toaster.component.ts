import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations'
import { UiFeedback } from 'src/assets/types/UiFeedback.type';
import { AppService } from 'src/app/services/app/app.service';
import { copyOf } from 'src/assets/utilities/copyOf';
import { id } from 'src/assets/utilities/shortId';

export type Notice = UiFeedback & { id?:string }


@Component({
  selector: 'app-feedback-toaster',
  templateUrl: './feedback-toaster.component.html',
  styleUrls: ['./feedback-toaster.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateY(20%)'}),
        animate('200ms ease-in', style({transform: 'translateY(0%)'}))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({transform: 'translateY(100%)'}))
      ])
    ])
  ]
})
export class FeedbackToasterComponent implements OnInit {

  public notices:Notice[]


  constructor(
    private app:AppService
  ) { }












  ngOnInit() {
    this.notices = [ ]
    this.app.events.onUserFeedbackChannelSecondary.subscribe(feedback => this.onFeedback(feedback))
  }












  private onFeedback(feedback) {
    try { this._onFeedback(feedback) }
    catch (error) {
      this.app.events.onError.next({ signature: 'error-948ba369-bf35-4fd4-b194-10424b50f24a', details: error })
    }
  }




      private _onFeedback(feedback) {
        let notice = copyOf(feedback)
        notice.id = id()
        this.notices.push(notice)
      }












  public onDismiss(id) {
    try { this._onDismiss(id) }
    catch (error) {
      this.app.events.onError.next({ signature: 'error-0fedd630-7721-4bfa-b7ab-c48b2122cd5d', details: error })
    }
  }




      private _onDismiss(id) {
        this.notices = this.notices.filter(notice => notice.id !== id)
      }

}
