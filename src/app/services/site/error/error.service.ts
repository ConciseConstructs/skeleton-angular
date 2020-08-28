import { Injectable } from '@angular/core';
import { EventsService } from '../events/events.service';
import { DataModelApiService } from 'src/assets/classes/DataModelApiService.class';
import { HttpClient } from '@angular/common/http';
import { Error } from '../../../../assets/models/Error.model'
import { environment as saas } from '../../../../environments/environment'
import { SessionService } from '../session/session.service';
import { SettingsService } from '../settings/settings.service';


@Injectable({
  providedIn: 'root'
})
export class ErrorService extends DataModelApiService {


  constructor(
    private events:EventsService,
    private session:SessionService,
    protected http:HttpClient,
    private settings:SettingsService
  ) {
    super(http)
    this.createLocalStorageForErrors()
    this.events.onError.subscribe(data => this.onError(data))
    this.setPersistInterval()
  }




      private createLocalStorageForErrors() {
        try { this._createLocalStorageForErrors() }
        catch (error) {
          this.onError({ signature: '5d42f357-1780-4065-bfc2-ef72ec6e5fbb', details: error })
        }
      }




          private _createLocalStorageForErrors() {
            localStorage.removeItem('errors')
            localStorage.setItem('errors', JSON.stringify([]))
          }




      private setPersistInterval() {
        setInterval(this.onPersistErrorInterval.bind(this), this.settings.values.persistErrorsInterval)
      }












  protected hookConstructorPre() {
    this.endpoint = saas.endpoints.error
    this.Model = Error
  }












  private onError(params:{ signature:string, details:any }) {
    console.error(params)
    let error = new this.Model()
    error.saas = saas.name
    error.createdAt = new Date().valueOf()
    error.accountId = this.session.acctId
    if (this.session.userId) error.userId = this.session.userId
    error.signature = params.signature
    error.details = this.determineDetailsByErrorType(params.details)
    let errors = JSON.parse(localStorage.getItem('errors'))
    errors.push(error)
    localStorage.setItem('errors', JSON.stringify(errors))
  }




      private determineDetailsByErrorType(error) {
        switch (error.constructor) {
          case (ReferenceError): return error.toString()
          case (TypeError): return error.message
          default: return error
        }
      }












  private onPersistErrorInterval() {
    let uniqueErrors = { }, promises = [ ], errors = JSON.parse(localStorage.getItem('errors'))
    if (!errors || errors.length === 0) return
    errors.forEach(error => uniqueErrors[error.signature] = error)
    Object.values(uniqueErrors).forEach(uniqueError => promises.push(this.save(uniqueError)))
    Promise.all(promises)
      .then(result => this.onSaveSuccess(result))
      .catch(error => this.onSaveFailure(error))
  }



      private onSaveSuccess(result) {
        localStorage.removeItem('errors')
        localStorage.setItem('errors', JSON.stringify([]))
      }




      private onSaveFailure(error) {
        console.error('Unable to log error remotely.')
      }

}
