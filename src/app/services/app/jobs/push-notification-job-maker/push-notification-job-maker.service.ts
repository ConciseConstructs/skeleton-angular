import { Injectable } from '@angular/core';
import { environment as saas } from '../../../../../environments/environment'
import { Job } from 'src/assets/types/Job.type';
import { EventsService } from '../../events/events.service';


@Injectable({
  providedIn: 'root'
})
export class PushNotificationJobMakerService {


  constructor(
    private events:EventsService
  ) { }












  public make(params:{ dueAt:number, accountId:string, to:string[], title:string, body:string, boundTo:string }):Job {
    try { return this._make(params) }
    catch (error) {
      this.events.onError.next({ signature: 'signatureString', details: error })
    }
  }




      private _make(params):Job {
        return {
          id: `${ params.boundTo }-${ params.dueAt }-push`,
          status: 'queued',
          dueAt: params.dueAt,
          saas: saas.name,
          accountId: params.accountId,
          boundTo: params.boundTo,
          details: {
            lambdaName: `Push-${ saas.stage }-send`,
            params: {
              to: params.to,
              title: params.title,
              body: params.body
            }
          }
        }
      }

}
