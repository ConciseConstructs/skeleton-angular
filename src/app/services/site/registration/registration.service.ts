import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ICreateProfileRequest } from 'src/assets/interfaces/auth-server-service-interface/ICreateProfile.interface';
import { EventsService } from '../events/events.service';
import { ICreateRequest } from 'src/assets/interfaces/login-server-service-interface/ICreate.interface';
import { environment as saas } from '../../../../environments/environment'
import { id } from 'src/assets/utilities/shortId';
import { DbService } from '../db/db.service';


@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private hasCreatedAuthProfile:boolean
  private hasCreatedLoginProfile:boolean
  private email:string


  constructor(
    private auth:AuthService,
    private events:EventsService,
    private db:DbService
  ) {
    this.setupEventListeners()
  }




      private setupEventListeners() {
        this.events.onAuthProfileCreateOutcome.subscribe(outcome => this.onAuthProfileCreateOutcome(outcome))
        this.events.onLoginProfileCreateOutcome.subscribe(outcome => this.onLoginProfileCreateOutcome(outcome))
      }












  public signUp(params:ICreateProfileRequest) {
    try { this._signUp(params) }
    catch (error) {
      this.events.onError.next({ signature: 'error-86d0caaa-907a-4782-b10d-7fb81b64213c', details: error })
    }
  }




      private _signUp(params) {
        this.email = params.username
        this.auth.createProfile(params)
          .then(result => this.onCreateAuthProfileSuccess(result))
          .catch(error => this.onCreateAuthProfileFailure(error))
      }




          private onCreateAuthProfileFailure(error) {  console.error('error-6fce68c1-361e-46ca-bc60-15907b254d19', error)
            this.events.onAuthProfileCreateOutcome.next({ success: false, details: error.thirdParty })
          }




          private onCreateAuthProfileSuccess(result) {
            if (!result.success) this.onCreateAuthProfileFailure(result)
            else this.events.onAuthProfileCreateOutcome.next({ success: true, details: this.createLoginProfile(result) } )
          }




              private createLoginProfile(result) {
                let accountId = id()
                return  {
                  saasName: saas.name,
                  authId: result.thirdParty.authId,
                  acctId: accountId,
                  userId: accountId,
                } as ICreateRequest
              }












  public closeAccount() {
    throw new Error('Not Developed Yet')
  }












  private onAuthProfileCreateOutcome(outcome) {
    try { this._onAuthProfileCreateOutcome(outcome) }
    catch (error) {
      this.events.onError.next({ signature: 'error-af47894b-0de0-46d9-9037-813ff566e987', details: error })
    }
  }




      private _onAuthProfileCreateOutcome(outcome) {
        this.hasCreatedAuthProfile = outcome.success
        if (!outcome.success) this.events.onSignUpOutcome.next({ success: false, details: outcome.details })
        else this.createUserDatabase(outcome)
      }




          private createUserDatabase(outcome) {
            this.db.create(outcome.details.acctId, this.email)
          }












  private onLoginProfileCreateOutcome(outcome) {
    try { this._onLoginProfileCreateOutcome(outcome) }
    catch (error) {
      this.events.onError.next({ signature: 'error-ffac3e39-3ec0-4035-83d5-4002576dbc1b', details: error })
    }
  }




      private _onLoginProfileCreateOutcome(outcome) {
        this.hasCreatedLoginProfile = outcome.success
        if (!outcome.success) this.events.onSignUpOutcome.next({ success: false, details: outcome.details })
        else if (this.isFinished) this.events.onSignUpOutcome.next({ success: true, details: outcome.details })
      }












  private get isFinished() {
    try { return this._isFinished() }
    catch (error) {
      this.events.onError.next({ signature: 'error-2755d121-7dda-41ea-af2b-40cf8353ae24', details: error })
    }
  }




      private _isFinished() {
        if (this.hasCreatedAuthProfile && this.hasCreatedLoginProfile) return true
        else return false
      }

}
