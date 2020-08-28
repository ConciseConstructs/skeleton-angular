import { Injectable } from '@angular/core';
import { Job } from 'src/assets/types/Job.type';
import { environment as saas } from '../../../../../environments/environment'
import { EventsService } from '../../events/events.service';


@Injectable({
  providedIn: 'root'
})
export class SendEmailJobMakerService {

  constructor(
    private events:EventsService
  ) { }












  public make(params:{ id:string, dueAt:any, accountId:string, toAddresses:string[], from:string, title:string, body:string, boundTo:string }):Job {
    try { return this._make(params) }
    catch (error) {
      this.events.onError.next({ signature: 'e6d19204-6905-4e71-930a-d70420e105ff', details: error })
    }
  }




      private _make(params):Job {
        return {
          id: `${ params.boundTo }-${ params.dueAt }-email`,
          status: 'queued',
          dueAt: params.dueAt,
          saas: saas.name,
          accountId: params.accountId,
          boundTo: params.boundTo,
          details: {
            lambdaName: `Email-${ saas.stage }-send`,
            params: {
              toAddresses: params.toAddresses,
              from: params.from,
              subject: params.title,
              body: params.body,
              bodyTextVersion: params.body,
            }
          }
        }
      }

}
