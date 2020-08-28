import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as saas } from '../../../../environments/environment'
import { HttpOptions } from 'src/assets/classes/HttpOptions.class';
import { EventsService } from '../events/events.service';


@Injectable({
  providedIn: 'root'
})
export class CaptchaService {

  private baseUrl:string


  constructor(
    private http:HttpClient,
    private events:EventsService
  ) {
    this.init()
  }




    private init() {
      this.baseUrl = `${ saas.protocol }://${ saas.endpoints.captcha }.${ saas.apiUrl }/${ saas.stage }`
      this.events.onCaptchaSubmission.subscribe(submission => this.verify(submission))
    }







  public verify(captchaSubmission) {
    let options = new HttpOptions()
    options.params = { siteName: saas.name, captchaSubmission: captchaSubmission }
    this.http.post(this.baseUrl + `/verify`, options).toPromise()
      .then(result => this.onVerifySuccess(result))
      .catch(error => this.onVerifyFailure(error))
    }




        private onVerifyFailure(error) {
          this.events.onError.next({ signature: 'error-61510fcb-63f2-468e-958a-13f170cf6e5e', details: error })
          this.events.onVerifyHuman.next(false)
        }




        private onVerifySuccess(result) {
          if (!result.success) this.onVerifyFailure(result)
          else this.events.onVerifyHuman.next(true)
        }


}
