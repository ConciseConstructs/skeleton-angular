import { Injectable } from '@angular/core';
import { environment as saas } from '../../../../environments/environment'
import { HttpClient } from '@angular/common/http';
import { HttpOptions } from 'src/assets/classes/HttpOptions.class';
import { ErrorService } from '../error/error.service';


@Injectable({
  providedIn: 'root'
})
export class GlobalsService {

  private baseUrl:string


  constructor(
    private http:HttpClient,
    private error:ErrorService
  ) {
    this.init()
  }




      private init() {
        this.baseUrl = `${ saas.protocol }://${ saas.endpoints.globals }.${ saas.apiUrl }/${ saas.stage }`
      }












  public getAllGlobals() {
    this.getApiIds()
    this.getContactFormRecipients()
  }












  public getApiIds() {
    try { this._getApiIds() }
    catch (error) {
      this.error.save({ signature: 'error-2b39155e-55d3-4598-a10f-150ed7580fe4', details: error })
    }
  }




      private _getApiIds() {
        let options = new HttpOptions()
        options.params = { value: 'apiIds' }
        this.http.get(this.baseUrl + '/get', options).toPromise()
          .then(result => this.onGetApiIdsSuccess(result))
          .catch(error => this.onGetApiIdsFailure(error))
      }




      private onGetApiIdsFailure(error) {  console.log('error-46e91266-29e2-4fe9-a84b-19b7721a2a50', error)
        this.error.save(error)
      }




      private onGetApiIdsSuccess(result) {
        if (!result.success) this.onGetApiIdsFailure(result)
        else this.setApiIds(result)
      }




          private setApiIds(result) {
            for (let [ api, id ] of Object.entries(result.details.Items[0].details)) {
              if (saas.endpoints[api]) saas.endpoints[api] = id
            }
          }












  public getContactFormRecipients() {
    try { this._getContactFormRecipients() }
    catch (error) {
      this.error.save({ signature: 'error-2b39155e-55d3-4598-a10f-150ed7580fe4', details: error })
    }
  }




      private _getContactFormRecipients() {
        let options = new HttpOptions()
        options.params = { value: 'contactFormRecipients' }
        this.http.get(this.baseUrl + '/get', options).toPromise()
          .then(result => this.onGetContactFormRecipientsSuccess(result))
          .catch(error => this.onGetContactFormRecipientsFailure(error))
      }




      private onGetContactFormRecipientsFailure(error) {  console.log('error-46e91266-29e2-4fe9-a84b-19b7721a2a50', error)
        this.error.save(error)
      }




      private onGetContactFormRecipientsSuccess(result) {
        if (!result.success) this.onGetApiIdsFailure(result)
        else this.setContactFormRecipients(result)
      }




          private setContactFormRecipients(result) {
            for (let [ websiteName, value ] of Object.entries(result.details.Items[0].details)) {
              if (saas.name === websiteName) saas.contactId = value
            }
          }

}
