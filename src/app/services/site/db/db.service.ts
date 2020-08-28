import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICreateRequest } from '../../../../assets/interfaces/database-server-service-interface/create.interface'
import { environment as saas } from '../../../../environments/environment'
import { EventsService } from '../events/events.service';
import { HttpOptions } from 'src/assets/classes/HttpOptions.class';
import { TimeService } from '../time/time.service';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  private accountId:string
  private skeleton:any
  private url:string
  private email:string

  constructor(
    private time:TimeService,
    private events:EventsService,
    private http:HttpClient
  ) {
    this.setupBaseUrl()
  }




      private setupBaseUrl() {
        this.url = `${ saas.protocol }://${ saas.endpoints.database }.${ saas.apiUrl }/${ saas.stage }`
      }












  public create(accountId:string, email:string) {
    try { this._create({ accountId: accountId, email: email }) }
    catch (error) {
      this.events.onError.next({ signature: 'a2d43c8c-2aca-4c66-975f-4605e546c8e6', details: error })
    }
  }




      private _create(params:{ accountId:string, email:string }) {
        this.email = params.email
        this.createAccountId(params.accountId)
        this.createSkeleton()
        this.createRecords()
        this.sendRequest()
      }




          private createAccountId(accountId) {
            this.accountId = accountId
            this.events.onAccountId.next(this.accountId)
          }




          private createSkeleton() {
            this.skeleton = { saasName: saas.name, records: [] } as ICreateRequest
          }




          private createRecords() {
            let guessTimezone = this.time.guessTimeZone()
            this.skeleton.records.push({ id: "default", links: { }, streak: 5, table: `${ this.accountId }.settings`, email: this.email, emailNotifications: true, timezone: guessTimezone, utcOffset: this.time.getUtcOffset(guessTimezone) })
          }




          private sendRequest() {
            let options = new HttpOptions()
            options.params = this.skeleton
            this.http.post(`${ this.url }/create`, options).toPromise()
              .then(result => this.onCreateDatabaseSuccess(result))
              .catch(error => this.onCreateDatabaseFailure(error))
          }




              private onCreateDatabaseFailure(error) {
                this.events.onCreateDatabase.next({ success: false, details: error })
              }




              private onCreateDatabaseSuccess(result) {
                if (Object.keys(result.details.UnprocessedItems).length > 0) this.onCreateDatabaseFailure(result)
                else this.events.onCreateDatabase.next({ success: true, details: result.details })
              }

}
