import { Injectable } from '@angular/core';
import { EventsService } from '../events/events.service';
import { SessionService } from '../session/session.service';


@Injectable({
  providedIn: 'root'
})
export class OfflineService {

  private synchronizedTags:boolean|null
  private synchronizedQuestions:boolean|null
  private synchronizedQuizzes:boolean|null
  private synchronizedRemovals:boolean|null
  private online:boolean


  constructor(
    private events:EventsService,
    private session:SessionService
  ) {
    this.setupValues()
    this.setupEventListeners()
  }




      private setupValues() {
        this.synchronizedTags = null
        this.synchronizedQuestions = null
        this.synchronizedQuizzes = null
        this.synchronizedRemovals = null
      }




      private setupEventListeners() {
        try { this._setupEventListeners() }
        catch (error) {
          this.events.onError.next({ signature: 'b136810d-2ad1-4c94-a09c-c58ce4f0b511', details: error })
        }
      }




          private _setupEventListeners() {
            this.events.onConnectionChange.subscribe(outcome => this.onConnectionChange(outcome))
            this.events.onRequestRecordRemovalSyncOutcome.subscribe(outcome => this.onRequestRecordRemovalSyncOutcome(outcome))
          }












  public createDbIfNotExist() {
    try {
      let settings = localStorage.getItem(`${ this.session.acctId }.settings`)
      if (!settings) localStorage.setItem(`${ this.session.acctId }.settings`, JSON.stringify({}))
      let devices = localStorage.getItem(`${ this.session.acctId }.devices`)
      if (!devices) localStorage.setItem(`${ this.session.acctId }.devices`, JSON.stringify([]))
      let tags = localStorage.getItem(`${ this.session.acctId }.tags`)
      if (!tags) localStorage.setItem(`${ this.session.acctId }.tags`, JSON.stringify([]))
      let questions = localStorage.getItem(`${ this.session.acctId }.questions`)
      if (!questions) localStorage.setItem(`${ this.session.acctId }.questions`, JSON.stringify([]))
      let quizzes = localStorage.getItem(`${ this.session.acctId }.quizzes`)
      if (!quizzes) localStorage.setItem(`${ this.session.acctId }.quizzes`, JSON.stringify([]))
      let queueRemove = localStorage.getItem(`${ this.session.acctId }.queueRemove`)
      if (!queueRemove) localStorage.setItem(`${ this.session.acctId }.queueRemove`, JSON.stringify([]))
    } catch (error) { console.error('error-013f0469-3145-46a6-b2a1-16829fa254ad', error) }
  }












  public getTable(tableName:string):any[] {
    try { return this._getTable(tableName) }
    catch (error) {
      this.events.onError.next({ signature: 'df5e9397-b60b-4740-bdb4-85f371a37456', details: error })
    }
  }




      private _getTable(tableName) {
        return JSON.parse(localStorage.getItem(tableName))
      }












  public createTable(params:{ table:string, records:any[] }) {
    try { this._createTable(params) }
    catch (error) {
      this.events.onError.next({ signature: '87aa5247-0b0f-40e3-9b73-dbd83674cb62', details: error })
    }
  }




      private _createTable(params) {
        localStorage.setItem(params.table, JSON.stringify(params.records))
      }












  public insertItem(params:{ table:string, record:any }):any[] {
    try { return this._insertItem(params) }
    catch (error) {
      this.events.onError.next({ signature: 'error-542b366e-09f3-40d2-b6d3-681d832e7631', details: error })
    }
  }



      private _insertItem(params) {
        let records = JSON.parse(localStorage.getItem(params.table))
        if (!records) records = [ ]
        else if (records.constructor === Object) this.createNewRecord(params, records)
        else return this.insertIntoArray(params, records)
      }




          private insertIntoArray(params, records) {
            let recordExists = records.find(record => record.id === params.record.id)
            if (recordExists) return this.updateItem(params)
            else return this.createNewRecord(params, records)
          }




          private createNewRecord(params, records) {
            if (records.constructor === Array) records.push(params.record)
            else records = params.record
            localStorage.setItem(params.table, JSON.stringify(records))
            return JSON.parse(localStorage.getItem(params.table))
          }












  public updateItem(params:{ table:string, record:any }):any[] {
    try { return this._updateItem(params) }
    catch (error) {
      this.events.onError.next({ signature: 'error-201b879a-3102-415c-afd4-06a10972c777', details: error })
    }
  }




      private _updateItem(params) {
        let records = JSON.parse(localStorage.getItem(params.table))
        let updateIndex = records.findIndex(row => row.id === params.record.id)
        records[updateIndex] = params.record
        localStorage.setItem(params.table, JSON.stringify(records))
        return JSON.parse(localStorage.getItem(params.table))
      }












  public deleteItem(params:{ table:string, id:string }):any[] {
    try { return this._deleteItem(params) }
    catch (error) {
      this.events.onError.next({ signature: 'error-9f5b2bb0-92a3-4375-bb7f-d1972871eb66', details: error })
    }
  }




      private _deleteItem(params) {
        let records = JSON.parse(localStorage.getItem(params.table)) as any[]
        let deleteIndex = records.findIndex(row => row.id === params.id)
        records.splice(deleteIndex, 1)
        localStorage.setItem(params.table, JSON.stringify(records))
        if (!this.online) this.queueForRemoval({ table: params.table, id: params.id })
        return JSON.parse(localStorage.getItem(params.table))
      }




          private queueForRemoval(params:{ table:string, id:string }) {
            let queueRemove = JSON.parse(localStorage.getItem('queueRemove'))
            queueRemove.push({ table: params.table, id: params.id })
            localStorage.setItem('queueRemove', JSON.stringify(queueRemove))
          }












  public syncOfflineRecords() {
    try { this._syncOfflineRecords() }
    catch (error) {
      this.events.onError.next({ signature: 'error-6def7bf4-3e98-49fe-bd75-34f411704f81', details: error })
    }
  }




      private _syncOfflineRecords() {
        // this.syncTags()
        // this.syncQuestions()
        // this.syncQuizzes()
        // this.syncRemovals()
      }




          // private syncTags() {
          //   let tags = (JSON.parse(localStorage.getItem(`${ this.session.acctId }.tags`)) as Tag[]).filter(tag => tag.offline === true)
          //   if (tags.length > 0) this.events.onRequestTagsSync.next(tags)
          //   else this.synchronizedTags = true
          //   this.monitorRecordsSyncCompletion()
          // }




          // private syncQuestions() {
          //   let questions = (JSON.parse(localStorage.getItem(`${ this.session.acctId }.questions`)) as Question[]).filter(q => q.offline === true)
          //   if (questions.length > 0) this.events.onRequestQuestionsSync.next(questions)
          //   else this.synchronizedQuestions = true
          //   this.monitorRecordsSyncCompletion()
          // }




          // private syncQuizzes() {
          //   let quizzes = (JSON.parse(localStorage.getItem(`${ this.session.acctId }.quizzes`)) as Quiz[]).filter(q => q.offline === true)
          //   if (quizzes.length > 0) this.events.onRequestQuizzesSync.next(quizzes)
          //   else this.synchronizedQuizzes = true
          //   this.monitorRecordsSyncCompletion()
          // }




          // private syncRemovals() {
          //   let removals = (JSON.parse(localStorage.getItem(`${ this.session.acctId }.queueRemove`)) as { table:string, id:string}[])
          //   if (removals.length > 0) removals.forEach(record => this.events.onRequestRecordRemovalSync.next(record))
          //   else this.synchronizedRemovals = true
          //   this.monitorRecordsSyncCompletion()
          // }












  // private onRequestTagsSyncOutcome(outcome) {
  //   try { this._onRequestTagsSyncOutcome(outcome) }
  //   catch (error) {
  //     this.events.onError.next({ signature: '661888ef-17c8-4e0b-9344-39fc8f4cf1df', details: error })
  //   }
  // }




      // private _onRequestTagsSyncOutcome(outcome) {
      //   if (outcome.success) this.synchronizedTags = true
      //   else this.synchronizedTags = false
      //   this.monitorRecordsSyncCompletion()
      // }












  // private onRequestQuestionsSyncOutcome(outcome) {
  //   try { this._onRequestQuestionsSyncOutcome(outcome) }
  //   catch (error) {
  //     this.events.onError.next({ signature: 'c389b172-a53a-4613-9cc5-6b951786acc9', details: error })
  //   }
  // }




      // private _onRequestQuestionsSyncOutcome(outcome) {
      //   if (outcome.success) this.synchronizedQuestions = true
      //   else this.synchronizedQuestions = false
      //   this.monitorRecordsSyncCompletion()
      // }












  // private onRequestQuizzesSyncOutcome(outcome) {
  //   try { this._onRequestQuizzesSyncOutcome(outcome) }
  //   catch (error) {
  //     this.events.onError.next({ signature: '8a869ade-f693-430e-9db1-cbbbf3a0bf06', details: error })
  //   }
  // }




      // private _onRequestQuizzesSyncOutcome(outcome) {
      //   if (outcome.success) this.synchronizedQuizzes = true
      //   else this.synchronizedQuizzes = false
      //   this.monitorRecordsSyncCompletion()
      // }












  private onRequestRecordRemovalSyncOutcome(params:{ success:boolean, details?:{ table:string, id:string }}) {
    try { this._onRequestRecordRemovalSyncOutcome(params) }
    catch (error) {
      this.events.onError.next({ signature: '80f426a7-4c36-4a24-a525-693e5e70d457', details: error })
    }
  }




      private _onRequestRecordRemovalSyncOutcome(params) {
        if (!params.success) this.isFinishedProcessingQueueRemove()
        else this.updateQueueRemove(params)
      }




          private updateQueueRemove(params) {
            let queueRemove = JSON.parse(localStorage.getItem(`${ this.session.acctId }.queueRemove`))
            let indexRemove = queueRemove.findIndex(record => {
              if ((record.id === params.details.id) && (record.table === params.details.table)) return true
            })
            queueRemove.splice(indexRemove, 1)
            localStorage.setItem(`${ this.session.acctId }.queueRemove`, JSON.stringify(queueRemove))
            if (queueRemove.length === 0) this.isFinishedProcessingQueueRemove()
          }




          private isFinishedProcessingQueueRemove() {
            this.synchronizedRemovals = true
            this.monitorRecordsSyncCompletion()
          }












  private monitorRecordsSyncCompletion() {
    if (this.synchronizedTags === null || this.synchronizedQuestions === null || this.synchronizedQuizzes === null || this.synchronizedRemovals === null) return
    else this.events.onSynchronizedDatabase.next({ success: true, details: { tags: this.synchronizedTags, questions: this.synchronizedQuestions, quizzes: this.synchronizedQuizzes, removals: this.synchronizedRemovals }})
  }












  private onConnectionChange(outcome) {
    this.online = outcome.success
  }

}
