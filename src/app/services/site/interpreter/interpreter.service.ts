import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { EventsService } from '../events/events.service';
import { SettingsService } from '../settings/settings.service';
import { FormService } from './form/form.service';


export type ComponentName = 'segmentButton'|'dropdown'|'time'

@Injectable({
  providedIn: 'root'
})
export class InterpreterService {


  constructor(
    public form:FormService,
    private events:EventsService,
    private settings:SettingsService
  ) { }












  public componentOutput(componentName:ComponentName, event) {
    try { return this._componentOutput(componentName, event) }
    catch (error) {
      this.events.onError.next({ signature: '0ec8820d-0db0-4389-8612-730543fefe8c', details: error })
    }
  }




      private _componentOutput(componentName, event) {
        switch (componentName) {
          case 'segmentButton': return this.interpretSegmentButtonOutput(event)
          case 'dropdown': return this.interpretDropdownOutput(event)
          case 'time': return this.interpretTimeOutput(event)
        }
      }




          private interpretSegmentButtonOutput(event) {
            if (event.detail) return event.detail.value
            else if (event.option) return event.option.value
          }




          private interpretDropdownOutput(event) {
            if (event.detail) return event.detail.value
            else if (event.value) return event.value.value
          }




          private interpretTimeOutput(value:any) {
            if (value.constructor === String)
              if (value.includes('T')) return value.split('T')[1].slice(0, 5)
              else return value
            else if (value.constructor === Date) {
              let segments = value.toString().split(' ')[4].split(':')
              return `${ segments[0] }:${ segments[1] }`
            }
          }












  public error(error) {
    try { return this._error(error) }
    catch (error) {
      this.events.onError.next({ signature: '09fdc42a-c4de-4eb5-bc09-3db13d052bbb', details: error })
    }
  }




      private _error(error) {
        if (!error) return
        switch (error.constructor) {
          case HttpErrorResponse: return this.interpretErrorAsHttpError(error)
          case String: return this.interpretErrorAsString(error)
          case Object: return this.interpretErrorObject(error)
        }
      }




          private interpretErrorAsHttpError(error) {
            switch (error.statusText) {
              case "Unknown Error": return `Unable to connect to server, please try again.`
              default:
                break;
            }
          }




          private interpretErrorAsString(error) { // *(Details - Search "Footnote:1")
            switch (error) {
              case 'cognito:UserNotConfirmedException': return `Please check your email for a message from "no-reply@verificationemail.com" and click the verification link before logging in.`
              case 'cognito:UserNotFoundException': return `Invalid login credentials.  Please re-enter the values and try again.`
              case 'cognito:PasswordResetRequiredException': return `A password reset request was made.  Please check your email and reset your password before attempting to login.`
              case 'cognito:UsernameExistsException': return `An account with the given email already exists.  Try logging in instead of signing up.`
              case 'cognito:TooManyRequestsException': return `There have been too many attempts.  Please wait a while and try again.`
              case 'cognito:NotAuthorizedException':return `Login Failed.`
              case 'cognito:InternalErrorException': return this.genericErrorMessage
              case 'cognito:InvalidParameterException': return this.genericErrorMessage
              case 'cognito:InvalidLambdaResponseException': return this.genericErrorMessage
              case 'cognito:ResourceNotFoundException': return this.genericErrorMessage
              case 'cognito:UnexpectedLambdaException': return this.genericErrorMessage
              case 'cognito:InvalidSmsRoleAccessPolicyException': return this.genericErrorMessage
              case 'cognito:InvalidSmsRoleTrustRelationshipException': return this.genericErrorMessage
              case 'cognito:InvalidUserPoolConfigurationException': return this.genericErrorMessage
              case 'cognito:UserLambdaValidationException': return this.genericErrorMessage
              default: return this.genericErrorMessage;
            }
          }




          private interpretErrorObject(error) {
            if (error.code) return this.interpretErrorCode(error)
            else if (error.message) return error.message
          }












  private interpretErrorCode(error) {
    // Need to develop this as error codes are encountered
    if (error.code === "InvalidParameterException" && error.message === "Cannot perform specific action because there does not exist a valid use pool domain associated with the user pool") return this.genericErrorMessage
    else switch (error.code) {
      case "": return
    }
  }












  private get genericErrorMessage() {
    return this.settings.messages.genericErrorMessage
  }

}


/* Footnote:1 Details - Last Updated: 02/14/20 by BBD:
 *  > Cognito Error Codes: https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_InitiateAuth.html#API_InitiateAuth_Errors
 */
