import { Injectable } from '@angular/core';
import { ICreateProfileRequest, ICreateProfileResponse } from '../../../../assets/interfaces/auth-server-service-interface/ICreateProfile.interface'
import { IAttemptAuthRequest, IAttemptAuthResponse } from '../../../../assets/interfaces/auth-server-service-interface/IAttemptAuth.interface'
import { IChangePasswordRequest, IChangePasswordResponse } from '../../../../assets/interfaces/auth-server-service-interface/IChangePassword.interface'
import { IRemoveProfileRequest, IRemoveProfileResponse } from '../../../../assets/interfaces/auth-server-service-interface/IRemoveProfile.interface'
import { ISignOutRequest, ISignOutResponse } from '../../../../assets/interfaces/auth-server-service-interface/ISignout.interface'
import { HttpClient } from '@angular/common/http';
import { HttpOptions } from 'src/assets/classes/HttpOptions.class';
import { environment as saas } from '../../../../environments/environment'
import { EventsService } from '../events/events.service';
import { IPasswordForgotRequestRequest, IPasswordForgotRequestResponse } from '../../../../assets/interfaces/auth-server-service-interface/IPasswordForgotRequest.interface'
import { IPasswordForgotResetResponse, IPasswordForgotResetRequest } from '../../../../assets/interfaces/auth-server-service-interface/IPasswordForgotReset.interface'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:string


  constructor(
    private events:EventsService,
    private http:HttpClient
  ) {
    this.createBaseUrl()
  }




      private createBaseUrl() {
        this.baseUrl = `${ saas.protocol }://${ saas.endpoints.auth }.${ saas.apiUrl }/${ saas.stage }`
      }












  public createProfile(params:ICreateProfileRequest):Promise<ICreateProfileResponse> {
    try { return this._createProfile(params) }
    catch (error) {
      this.events.onError.next({ signature: '8996d3a9-9fdd-4db5-84d7-fd6a7af40997', details: error })
    }
  }




      private _createProfile(params) {
        let options = new HttpOptions()
        options.params = params as ICreateProfileRequest
        return this.http.post(`${ this.baseUrl }/createProfile`, options).toPromise() as Promise<ICreateProfileResponse>
      }












  public attemptAuth(params:IAttemptAuthRequest):Promise<IAttemptAuthResponse> {
    try { return this._attemptAuth(params) }
    catch (error) {
      this.events.onError.next({ signature: '614ea188-ab98-47b2-8e0d-0f5ed66853c1', details: error })
    }
  }




      private _attemptAuth(params) {
        let options = new HttpOptions()
        options.params = params as IAttemptAuthRequest
        return this.http.post(`${ this.baseUrl }/attemptAuth`, options).toPromise() as Promise<IAttemptAuthResponse>
      }












  public changePassword(params:IChangePasswordRequest):Promise<IChangePasswordResponse> {
    try { return this._changePassword(params) }
    catch (error) {
      this.events.onError.next({ signature: '57b724fd-8143-4e66-b090-3775dec7fb0c', details: error })
    }
  }




      private _changePassword(params) {
        let options = new HttpOptions()
        options.params = params as IChangePasswordRequest
        return this.http.post(`${ this.baseUrl }/changePassword`, options).toPromise() as Promise<IChangePasswordResponse>
      }












  public removeProfile(params:IRemoveProfileRequest):Promise<IRemoveProfileResponse> {
    try { return this._removeProfile(params) }
    catch (error) {
      this.events.onError.next({ signature: 'acaea238-64df-4a96-94c3-b5c5291eb84c', details: error })
    }
  }




      private _removeProfile(params) {
        let options = new HttpOptions()
        options.params = params as IRemoveProfileRequest
        return this.http.post(`${ this.baseUrl }/removeProfile`, options).toPromise() as Promise<IRemoveProfileResponse>
      }












  public signout(params:ISignOutRequest):Promise<ISignOutResponse> {
    try { return this._signout(params) }
    catch (error) {
      this.events.onError.next({ signature: 'ef87460a-41de-4400-9ffe-866101786af4', details: error })
    }
  }




      private _signout(params):Promise<ISignOutResponse> {
        let options = new HttpOptions()
        options.params = params as ISignOutRequest
        return this.http.post(`${ this.baseUrl }/signout`, options).toPromise() as Promise<ISignOutResponse>
      }












  public passwordForgotRequest(params:IPasswordForgotRequestRequest) {
    let options = new HttpOptions()
    options.params = params as IPasswordForgotRequestRequest
    this.http.post(`${ this.baseUrl }/password-forgot-request`, options).toPromise()
      .then(result => this.onPasswordForgotRequestSuccess(result as IPasswordForgotRequestResponse))
      .catch(error => this.onPasswordForgotRequestFailure(error as IPasswordForgotRequestResponse))
  }




      private onPasswordForgotRequestFailure(failure:IPasswordForgotRequestResponse) {
        this.events.onAuthPasswordForgotRequest.next({ success: false, details: failure.thirdParty })
      }




      private onPasswordForgotRequestSuccess(result:IPasswordForgotRequestResponse) {
        if (!result.success) this.onPasswordForgotRequestFailure(result)
        else this.events.onAuthPasswordForgotRequest.next({ success: result.success, details: result.thirdParty.DeliveryCodeDetails })
      }













  public passwordForgotReset(params:IPasswordForgotResetRequest) {
    let options = new HttpOptions()
    options.params = params as IPasswordForgotResetRequest
    return this.http.post(`${ this.baseUrl }/password-forgot-reset`, options).toPromise()
      .then(result => this.onPasswordForgotResetSuccess(result as IPasswordForgotResetResponse))
      .catch(error => this.onPasswordForgotResetFailure(error))
  }




      private onPasswordForgotResetFailure(error:IPasswordForgotResetResponse) {
        this.events.onAuthPasswordForgotConfirmation.next({ success: false, details: error })
      }




      private onPasswordForgotResetSuccess(result:IPasswordForgotResetResponse) {
        if (!result.success) this.onPasswordForgotResetFailure(result)
        this.events.onAuthPasswordForgotConfirmation.next({ success: result.success, details: result.thirdParty })
      }

}