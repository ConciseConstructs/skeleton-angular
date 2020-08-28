import { copyOf } from 'src/assets/utilities/copyOf';
import { EventsService } from '../../app/services/site/events/events.service';
import { ApiService } from '../../app/services/site/api/api.service';
import { OfflineService } from '../../app/services/site/offline/offline.service';
import { StandardReturn } from '../types/StandardReturn.type';


export type Model = any

export abstract class DataModelProcessingService {

  protected modelName:string
  protected Model:Model
  protected onNewDataEmitterName:string
  protected _records:Model[]
  protected events:EventsService
  protected api:ApiService
  protected offline:OfflineService
  protected hookConstructorPre() { }
  protected hookConstructorPost() { }
  protected hookLoadRecordsPre() { }
  protected hookLoadRecordsPost() { }
  protected hookOnGetRecordsSuccessPre() { }
  protected hookOnGetRecordsSuccessPost() { }
  protected hookOnGetRecordsFailurePre() { }
  protected hookOnGetRecordsFailurePost() { }
  protected hookSavePre() { }
  protected hookSavePost(result, record) { }
  protected hookOnSaveRecordFailurePre() { }
  protected hookOnSaveRecordFailurePost() { }
  protected hookOnSaveRecordSuccessPre(result, record) { }
  protected hookOnSaveRecordSuccessPost(result, record) { }
  protected hookUpdatePre() { }
  protected hookUpdatePost() { }
  protected hookOnUpdateRecordFailurePre() { }
  protected hookOnUpdateRecordFailurePost() { }
  protected hookOnUpdateRecordSuccessPre(result, record) { }
  protected hookOnUpdateRecordSuccessPost() { }
  protected hookRemovePre() { }
  protected hookRemovePost() { }
  protected hookOnRemoveRecordFailurePre() { }
  protected hookOnRemoveRecordFailurePost() { }
  protected hookOnRemoveRecordSuccessPre() { }
  protected hookOnRemoveRecordSuccessPost() { }


  constructor() {
    this.hookConstructorPre()
    this.initialize()
    this.setupEventListeners()
    this.hookConstructorPost()
    this.checkRequirements()
  }




      protected initialize() {
        this._records = [ ]
      }




      protected setupEventListeners() { }




      protected checkRequirements() {
        if (!this.Model) throw new Error('No Model class provided')
        if (!this.modelName) throw new Error('No required model name assigned')
        if (!this.onNewDataEmitterName) throw new Error('No onNewData event emitter name was provided')
      }












  public loadRecords() {
    try { return this._loadRecords() }
    catch (error) {
      this.events.onError.next({ signature: 'bbc3a499-97b4-44c1-a64b-bd2877bc3ea3', details: error })
    }
  }




      private _loadRecords() {
        this.hookLoadRecordsPre()
        this.loadLocalRecordsImmediatelyInCaseOfBrowserRefreshOnEditForm()
        return this.executeLoad()
      }




          private loadLocalRecordsImmediatelyInCaseOfBrowserRefreshOnEditForm() {
            this.records = this.offline.getTable(`${ sessionStorage.getItem('acctId') }.${ this.modelName }`)
          }




          protected executeLoad() {
            this.api[this.modelName].getRecords(sessionStorage.getItem('acctId'))
              .then(result => this.onGetRecordsSuccess(result))
              .catch(error => this.onGetRecordsFailure(error))
          }




              protected onGetRecordsSuccess(result) {
                this.hookOnGetRecordsSuccessPre()
                this.processOnGetRecordsSuccess(result)
                this.hookOnGetRecordsSuccessPost()
                this.hookLoadRecordsPost()
              }




                  protected processOnGetRecordsSuccess(result) {
                    if (!result.success) this.onGetRecordsFailure(result)
                    else {
                      this.records = result.details.Items.map(record => new this.Model(record))
                      this.offline.createTable({ table: `${ sessionStorage.getItem('acctId') }.${ this.modelName }`, records: this.records || [ ] })
                    }
                  }




              protected onGetRecordsFailure(error) {  console.error('error-bacea89e-a1ef-4e32-aa10-42f86b5463b1', error)
                this.hookOnGetRecordsFailurePre()
                this.processGetRecordsFailure(error)
                this.hookOnGetRecordsFailurePost()
                this.hookLoadRecordsPost()
              }




                  protected processGetRecordsFailure(error) {
                    this.events.onConnectionChange.next({ success: false, details: this })
                    this.records = this.offline.getTable(`${ sessionStorage.getItem('acctId') }.${ this.modelName }`)
                  }












  public getId(id:string):any {
    try { return this._getId(id) }
    catch (error) {
      this.events.onError.next({ signature: '68dc2660-51ad-46ed-8e12-a5c02577fad4', details: error })
    }
  }



      private _getId(id) {
        let record = copyOf(this.records.find(record => record.id === id))
        return new this.Model(record)
      }












  public createNewInstance():any {
    return new this.Model()
  }












  public save(params:Model):Promise<StandardReturn> {
    try { return this._save(params) }
    catch (error) {
      this.events.onError.next({ signature: 'b925109f-8f3e-4f1b-90df-840478a12d8b', details: error })
    }
  }




      private _save(params) {
        this.hookSavePre()
        return this.executeSave(params)
      }




          protected executeSave(record) {
            record = new this.Model(record)
            record._item.tennantId = sessionStorage.getItem('acctId')
            record = record.prepareForPersistence()
            if (record.offline) delete record.offline
            return this.api[this.modelName].save(record)
              .then(result => this.onSaveRecordSuccess(result, record))
              .catch(error => this.onSaveRecordFailure(error, record))
          }




              protected onSaveRecordSuccess(result, record) {
                this.hookOnSaveRecordSuccessPre(result, record)
                this.processOnSaveRecordSuccess(result, record)
                this.hookSavePost(result, record)
                return new Promise((resolve) => resolve(result))
              }




                  protected processOnSaveRecordSuccess(result, record) {
                    if (!result.success) this.onSaveRecordFailure(result, record)
                    this.records = this.offline.insertItem({ table: `${ sessionStorage.getItem('acctId') }.${ this.modelName }`, record: record })
                  }




              protected onSaveRecordFailure(result, record) {  console.error('error-a9cece06-8a7b-4f81-b005-3bc4ade2924a', result)
                this.hookOnSaveRecordFailurePre()
                this.processSaveRecordFailure(result, record)
                this.hookOnSaveRecordFailurePost()
                this.hookSavePost(result, record)
                return new Promise((resolve)=> resolve(result))
              }




                  protected processSaveRecordFailure(result, record) {
                    this.events.onConnectionChange.next({ success: false, details: this })
                    result.details.offline = true
                    this.records = this.offline.insertItem({ table: `${ sessionStorage.getItem('acctId') }.${ this.modelName }`, record: result.details })
                  }












  public update(params:Model):Promise<StandardReturn> {
    try { return this._update(params) }
    catch (error) {
      this.events.onError.next({ signature: '03bb99c8-1aa2-4e3a-b2c3-01e3c1c685c8', details: error })
    }
  }




      private _update(params) {
        this.hookUpdatePre()
        return this.executeUpdate(params)
      }




          protected executeUpdate(record) {
            record._item.tennantId = sessionStorage.getItem('acctId')
            record = new this.Model(record).prepareForPersistence()
            if (record.offline) delete record.offline
            return this.api[this.modelName].update(record)
              .then(result => this.onUpdateRecordSuccess(result, record))
              .catch(error => this.onUpdateRecordFailure(error, record))
          }




              protected onUpdateRecordSuccess(result, record) {
                this.hookOnUpdateRecordSuccessPre(result, record)
                this.processOnUpdateRecordSuccess(result, record)
                this.hookOnUpdateRecordSuccessPost()
                this.hookUpdatePost()
                return new Promise((resolve)=> resolve({ success: true, details: result.details }))
              }




                  protected processOnUpdateRecordSuccess(result, record) {
                    if (!result.success) this.onUpdateRecordFailure(result, record)
                    this.records = this.offline.updateItem({ table: `${ sessionStorage.getItem('acctId') }.${ this.modelName }`, record: record })
                  }




              protected onUpdateRecordFailure(result, record) {  console.error('error-ceb2b970-08bb-4049-866a-ba3b5aa28a9f', result)
                this.hookOnUpdateRecordFailurePre()
                this.processOnUpdateRecordFailure(result)
                this.hookOnUpdateRecordFailurePost()
                this.hookUpdatePost()
                return new Promise((resolve) => resolve({ success: false, details: result.details }))
              }




                  protected processOnUpdateRecordFailure(result) {
                    this.events.onConnectionChange.next({ success: false, details: this })
                    result.details.offline = true
                    this.records = this.offline.updateItem({ table: `${ sessionStorage.getItem('acctId') }.${ this.modelName }`, record: result.details })
                  }












  public remove(params:{ accountId:string, id:string }):Promise<StandardReturn> {
    try { return this._remove(params) }
    catch (error) {
      this.events.onError.next({ signature: 'dc2fa50d-d1b0-4f38-b95a-b9e1cba57f97', details: error })
    }
  }




      private _remove(params) {
        this.hookRemovePre()
        return this.executeRemove(params)
      }




          protected executeRemove(params) {
            return this.api[this.modelName].remove(params)
              .then(result => this.onRemoveRecordSuccess(result, params.id))
              .catch(result => this.onRemoveRecordFailure(result, params.id))
          }




              protected onRemoveRecordFailure(result, id) {  console.error('error-327c46ff-7a2a-48ad-89b8-d268888c38db', result)
                this.hookOnRemoveRecordFailurePre()
                this.processOnRemoveRecordFailure(result, id)
                this.hookOnRemoveRecordFailurePost()
                this.hookRemovePost()
                return new Promise((resolve)=> { resolve({ success: false, details: result.details }) })
              }




                  protected processOnRemoveRecordFailure(result, id) {
                    this.events.onConnectionChange.next({ success: false, details: this })
                    this.records = this.offline.deleteItem({ table: `${ sessionStorage.getItem('acctId') }.${ this.modelName }`, id: id })
                  }




              protected onRemoveRecordSuccess(result, id) {
                this.hookOnRemoveRecordSuccessPre()
                this.processOnRemoveRecordSuccess(result, id)
                this.hookOnRemoveRecordSuccessPost()
                this.hookRemovePost()
                return new Promise((resolve)=> resolve({ success: true, details: result.details }))
              }




                  protected processOnRemoveRecordSuccess(result, id) {
                    if (!result.success) this.onRemoveRecordFailure(result, id)
                    this.records = this.offline.deleteItem({ table: `${ sessionStorage.getItem('acctId') }.${ this.modelName }`, id: id })
                  }












  public get records():Model[] {
    try {
      let records = copyOf(this._records)
      records.forEach((record, index) => records[index] = new this.Model(record))
      return records
    }
    catch (error) { this.events.onError.next({ signature: '863e6f4f-a7c2-4dee-bdc1-c552dfc02925', details: error }) }
  }












  public set records(value) {
    this._records = value
    this.events[this.onNewDataEmitterName].next(this.records)
  }

}
