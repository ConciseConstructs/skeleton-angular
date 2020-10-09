import { Component, OnInit } from '@angular/core';
import { environment as saas } from '../../../environments/environment'
import { EventsService } from 'src/app/services/site/events/events.service';


@Component({
  selector: 'app-captcha-google',
  templateUrl: './captcha-google.component.html',
  styleUrls: ['./captcha-google.component.scss'],
})
export class CaptchaGoogleComponent implements OnInit {

  public siteKey:string


  constructor(
    private events:EventsService
  ) { }












  ngOnInit() {
    this.siteKey = saas.captchaKey
  }












  public onCaptchaResolve(captchaSubmission) {
    this.events.onCaptchaSubmission.next(captchaSubmission)
  }

}
