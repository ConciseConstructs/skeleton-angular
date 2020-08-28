import { Injectable } from '@angular/core';
import { environment as saas } from '../../../../environments/environment'
import { StandardReturn } from 'src/assets/types/StandardReturn.type';
import { HttpOptions } from 'src/assets/classes/HttpOptions.class';
import { HttpClient } from '@angular/common/http';
import { EventsService } from '../events/events.service';


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private baseUrl:string


  constructor(
    private http:HttpClient,
    private events:EventsService
  ) {
    this.init()
  }




      private init() {
        this.baseUrl = `${ saas.protocol }://${ saas.endpoints.contact }.${ saas.apiUrl }/${ saas.stage }`
      }












  public sendMessage(params:{ from:string, message:string}):Promise<StandardReturn> {
    let options = new HttpOptions()
    options.params = { contactId: saas.contactId, saasName: saas.name, from: params.from, message: params.message }
    return this.http.post(this.baseUrl + '/sendMessage', options).toPromise()
      .then(result => this.onSendMessageSuccess(result))
      .catch(error => this.onSendMessageFailure(error))
  }




      private onSendMessageFailure(error) {
        this.events.onError.next({ signature: 'error-6427cc88-7b13-47b7-8431-74c2ee8caa3a', details: error })
        return error
      }




      private onSendMessageSuccess(result) {
        if (!result.success) this.onSendMessageFailure(result)
        return result
      }

}
