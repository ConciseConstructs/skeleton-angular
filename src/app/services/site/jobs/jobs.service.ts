import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpOptions } from '../../../../assets/classes/HttpOptions.class'
import { environment as saas } from '../../../../environments/environment'
import { Job } from 'src/assets/types/Job.type';
import { PushNotificationJobMakerService } from './push-notification-job-maker/push-notification-job-maker.service';
import { SendEmailJobMakerService } from './send-email-job-maker/send-email-job-maker.service';
import { EventsService } from '../events/events.service';


@Injectable({
  providedIn: 'root'
})
export class JobsService {


  constructor(
    public pushNotificationJob:PushNotificationJobMakerService,
    public sendEmailJob:SendEmailJobMakerService,
    private events:EventsService,
    private http:HttpClient,
  ) { }












  public schedule(job:Job) {
    try { return this._schedule(job) }
    catch (error) {
      this.events.onError.next({ signature: '351d4e33-cbad-4d05-b598-cf6222c95cf1', details: error })
    }
  }




      private _schedule(job) {
        let options = new HttpOptions()
        options.params = { item: job }
        let url = `${ saas.protocol }://${ saas.endpoints.schedule }.${ saas.apiUrl }/${ saas.stage }/update`
        return this.http.put(url, options).toPromise()
      }

}
