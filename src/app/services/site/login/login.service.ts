import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { EventsService } from '../events/events.service';
import { IAttemptAuthRequest, IAttemptAuthResponse } from 'src/assets/interfaces/auth-server-service-interface/IAttemptAuth.interface';
import { HttpClient } from '@angular/common/http';
import { environment as saas } from '../../../../environments/environment'
import { HttpOptions } from 'src/assets/classes/HttpOptions.class';
import { ICreateRequest, ICreateResponse } from '../../../../assets/interfaces/login-server-service-interface/ICreate.interface'
import { IDeleteRequest } from '../../../../assets/interfaces/login-server-service-interface/IDelete.interface'
import { IReadAuthIdRequest } from '../../../../assets/interfaces/login-server-service-interface/IReadAuthId.interface'
import { Verify } from 'src/assets/utilities/verifyPropertyExistsIn';

const verify = new Verify()


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl:string


  constructor(
    private auth:AuthService,
    private events:EventsService,
    private http:HttpClient
  ) {
    this.createBaseUrl()
    this.setupEventListeners()
  }




      private createBaseUrl() {
        this.baseUrl = `${ saas.protocol }://${ saas.endpoints.login }.${ saas.apiUrl }/${ saas.stage }`
      }




      private setupEventListeners() {
        this.events.onAuthProfileCreateOutcome.subscribe(outcome => this.onAuthProfileCreateOutcome(outcome))
      }












  public createLoginProfile(params:ICreateRequest):Promise<ICreateResponse> {
    try { return this._createLoginProfile(params) }
    catch (error) {
      this.events.onError.next({ signature: '8b4a329b-8089-4562-bb1b-3f6129cfd502', details: error })
    }
  }




      private _createLoginProfile(params) {
        let options = new HttpOptions()
        options.params = params as ICreateRequest
        return this.http.put(`${ this.baseUrl }/create`, options).toPromise() as Promise<ICreateResponse>
      }












  public deleteLoginProfile(params:IDeleteRequest) {
    throw new Error('Not developed yet.')
  }












  public attemptLogin(params:IAttemptAuthRequest) {
    try { this._attemptLogin(params) }
    catch (error) {
      this.events.onError.next({ signature: 'b252d554-0eeb-47fb-a3b9-fdbed3c9d15b', details: error })
    }
  }



      private _attemptLogin(params) {
        this.auth.attemptAuth(params)
          .then(result => this.onAuthSuccess(result))
          .catch(error => this.onAuthFailure(error))
      }




          private onAuthFailure(error:IAttemptAuthResponse) {  console.error('error-34f0e29f-e87d-47e5-9f25-df344ae896f5', error)
            if (error.thirdParty && error.thirdParty.code) this.events.onLoginOutcome.next({ success: false, details: `cognito:${ error.thirdParty.code }` })
            else this.events.onLoginOutcome.next({ success: false, details: `cognito:${ (error as any).statusText }` })
          }




          private onAuthSuccess(result:IAttemptAuthResponse) {
            if (!result.success) this.onAuthFailure(result)
            else this.lookupSAASLoginRecord(result)
          }




              private lookupSAASLoginRecord(result:IAttemptAuthResponse) {
                let options = new HttpOptions()
                options.params = { saasName: saas.name, authId: result.thirdParty.cognitoUser } as IReadAuthIdRequest
                this.http.get(`${ this.baseUrl }/read-authId`, options).toPromise()
                  .then(result => this.onLookupSAASLoginRecordSuccess(result))
                  .catch(error => this.onLookupSAASLoginRecordFailure(error))
              }




                  private onLookupSAASLoginRecordFailure(error) {  console.error('error-1a603790-baca-4fb7-8e9c-8660c36ef20b', error)
                    this.events.onLoginOutcome.next({ success: false, details: error })
                  }




                  private onLookupSAASLoginRecordSuccess(result) {
                    if (!result.success) this.onLookupSAASLoginRecordFailure(result)
                    else this.extractSAASLoginRecord(result)
                  }




                      private extractSAASLoginRecord(result) {
                        if (verify.property('result.details.Items').existsIn(result))
                          this.events.onLoginOutcome.next({ success: true, details: result.details.Items[0] })
                        else this.onLookupSAASLoginRecordFailure(result.details)
                      }












  public logout() {
    this.events.onLoginOutcome.next({ success: false })
  }












  private readLoginRecordByAuthId(params:IReadAuthIdRequest) {
    throw new Error('Not developed yet.')
  }












  private onAuthProfileCreateOutcome(outcome) {
    if (outcome.success) this.createLoginProfile(outcome.details)
      .then(result => this.onCreateLoginProfileSuccess(result))
      .catch(error => this.onCreateLoginProfileFailure(error))
  }




      private onCreateLoginProfileFailure(error) {  console.error('error-6ee68332-e127-4b9f-8f05-0475e1b76dce', error)
        this.events.onLoginProfileCreateOutcome.next({ success: false, details: error})
      }




      private onCreateLoginProfileSuccess(result) {
        if (!result.success) this.onCreateLoginProfileFailure(result)
        else this.events.onLoginProfileCreateOutcome.next({ success: true, details: result.details })
      }

}
