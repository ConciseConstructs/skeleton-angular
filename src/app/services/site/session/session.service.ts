import { Injectable } from '@angular/core';
import { EventsService } from '../events/events.service';


@Injectable({
  providedIn: 'root'
})
export class SessionService {


  constructor(
    private events:EventsService
  ) {
    this.clearSessionIfOutdated()
    this.setupEventListeners()
    this.checkIfSessionExists()
  }




      private clearSessionIfOutdated() {
        try { this._clearSessionIfOutdated() }
        catch (error) {
          this.events.onError.next({ signature: 'error-df61b0ca-c09a-4674-bed5-daa235268ba0', details: error })
        }
      }



          private _clearSessionIfOutdated() {
            let outdatedDate = this.setOutdatedCriteria()
            let sessionDate = new Date(this.timestamp).valueOf()
            if (sessionDate < outdatedDate) sessionStorage.clear()
          }




              private setOutdatedCriteria() {
                let daysOld = 30
                let now = new Date()
                return new Date()
                  .setDate(now.getDate() - daysOld)
              }




      private setupEventListeners() {
        this.events.onLoginOutcome.subscribe(outcome => this.onLoginOutcome(outcome))
        this.events.onAccountId.subscribe(accountId => sessionStorage.setItem('accountId', accountId))
      }




      private checkIfSessionExists() {
        if (this.acctId) this.events.onSessionValid.next()
      }












  private onLoginOutcome(outcome) {
    try { this._onLoginOutcome(outcome) }
    catch (error) {
      this.events.onError.next({ signature: 'error-97d197c2-9852-4055-9e29-0252bad9e728', details: error })
    }
  }




      private _onLoginOutcome(outcome) {
        if (outcome.success) this.startSession(outcome)
        else sessionStorage.clear()
      }




          private startSession(outcome) {
            this.acctId =  outcome.details.acctId
            this.authId = outcome.details.cognitoId
            this.timestamp = new Date().valueOf()
            this.events.onSessionValid.next()
          }












  public get authId():string {
    try { return this._authId() }
    catch (error) {
      this.events.onError.next({ signature: 'error-759bc025-ef88-4ec1-bc47-f02dfc101c3b', details: error })
    }
  }




      private _authId() {
        return sessionStorage.getItem('authId')
      }












  public set authId(value:string) {
    sessionStorage.setItem('authId', value)
  }












  public get acctId():string {
    try { return this._acctId() }
    catch (error) {
      this.events.onError.next({ signature: 'error-ab2c1030-29c9-4b03-b3b8-a2b8b909b427', details: error })
    }
  }




      private _acctId() {
        let accountId = sessionStorage.getItem('acctId')
        if (accountId) return accountId
        else return null
      }












  public set acctId(value:string) {
    sessionStorage.setItem('acctId', value)
  }












  public get userId():string {
    try { return this._userId() }
    catch (error) {
      this.events.onError.next({ signature: 'error-a43fece5-fbb0-4112-a3c9-625692fe0d3e', details: error })
    }
  }




      private _userId() {
        let userId = sessionStorage.getItem('userId')
        if (userId) return userId
        else return null
      }












  public set userId(value:string) {
    sessionStorage.setItem('userId', value)
  }












  public get timestamp() {
    try { return this._timestamp() }
    catch (error) {
      this.events.onError.next({ signature: 'error-1ffc4522-cc17-4523-8cc1-ffd88750b18b', details: error })
    }
  }




      private _timestamp() {
        return parseInt(sessionStorage.getItem('timestamp'))
      }












  public set timestamp(value:number) {
    sessionStorage.setItem('timestamp', JSON.stringify(value))
  }

}
