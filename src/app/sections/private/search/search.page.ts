import { Component } from '@angular/core';
import { SiteService } from 'src/app/services/site/site.service';
import { Question } from 'src/assets/models/Question.model';
import { Quiz } from 'src/assets/models/Quiz.model';
import { Tag } from 'src/assets/models/Tag.model';
import { ConciseComponent } from 'src/assets/classes/ConciseComponent.class';
import { QuestionsProcessingService } from 'src/app/services/processors/questions-processing/questions.processing.service';
import { TagsProcessingService } from 'src/app/services/processors/tags-processing/tags.processing.service';
import { QuizesProcessingService } from 'src/app/services/processors/quizes-processing/quizes.processing.service';
import { Breadcrumbs } from 'src/assets/types/Breadcrumbs.type';


@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage extends ConciseComponent {

  public breadcrumbs:Breadcrumbs
  public option:'questions'|'tags'|'quizes'
  private questions:Question[]
  private quizes:Quiz[]
  private tags:Tag[]
  private selectedRecord:Question|Quiz|Tag


  constructor(
    public site:SiteService,
    private questionsService:QuestionsProcessingService,
    private tagsService:TagsProcessingService,
    private quizesService:QuizesProcessingService
  ) {
    super(site)
  }












  protected init() {
    try { this._init() }
    catch (error) {
      this.onError({ signature: '6ebd44ad-0685-477f-9e93-feeaf78e60d5', details: error })
    }
  }




      private _init() {
        this.eventListeners.push(this.site.events.onNewQuestions.subscribe(result => this.onNewQuestions(result)))
        this.eventListeners.push(this.site.events.onNewQuizes.subscribe(result => this.onNewQuizes(result)))
        this.eventListeners.push(this.site.events.onNewTags.subscribe(result => this.onNewTags(result)))
        this.option = 'quizes'
        this.createBreadcrumbs()
      }

      private createBreadcrumbs() {
        this.breadcrumbs = [
          { label: 'Browse' }
        ]
      }












  public onBrowseOptionChange(event:CustomEvent) {
    try { this._onBrowseOptionsChange(event) }
    catch (error) {
      this.onError({ signature: 'b4180a6e-7dae-497f-beac-aed4493faea9', details: error })
    }
  }




      private _onBrowseOptionsChange(event) {
        this.option = event.detail.value
      }











  private onNewQuestions(result) {
    try { this._onNewQuestions(result) }
    catch (error) {
      this.onError({ signature: 'e121a729-8b7b-416c-816e-46643940b6b5', details: error })
    }
  }




      private _onNewQuestions(result) {
        this.questions = result
      }












  private onNewQuizes(result) {
    try { this._onNewQuizes(result) }
    catch (error) {
      this.onError({ signature: '1b8ce603-57c4-4ac9-827e-4837b27f9ac3', details: error })
    }
  }




      private _onNewQuizes(result) {
        this.quizes = result
      }












  private onNewTags(result) {
    try { this._onNewTags(result) }
    catch (error) {
      this.onError({ signature: '31833bd8-579e-4b91-90f4-62408035e51b', details: error })
    }
  }




      private _onNewTags(result) {
        this.tags = result
      }












  public onEditButtonClick(record:Question|Quiz|Tag) {
    try { this._onEditButtonClick(record) }
    catch (error) {
      this.onError({ signature: '42ad3b32-9f5d-463f-97b5-051ccd6e70dc', details: error })
    }
  }




      private _onEditButtonClick(record) {
        let url = this.determineCorrectUrl()
        this.site.router.navigate([url, record.id])
      }




          private determineCorrectUrl() {
            if (this.option !== 'quizes') return `edit-${ this.option.slice(0, this.option.length -1) }`
            else return `edit-quiz`
          }












  public onRemoveButtonClick(record:Question|Quiz|Tag) {
    try { this._onRemoveButtonClick(record) }
    catch (error) {
      this.onError({ signature: 'c912c502-c4bd-4a82-ae0f-c16b368f2c0b', details: error })
    }
  }




      private _onRemoveButtonClick(record) {
        this.selectedRecord = record
        let params = this.createAlertProperties()
        this.site.ui.confirm().create(params)
          .then(uiComponent => uiComponent.present())
      }




          private createAlertProperties() {
            return {
              message: `Are you sure you want to delete this from your ${ this.option }`,
              header: 'Confirm Removal',
              buttons: [
                { text: 'Cancel', role: 'cancel' },
                { text: 'Yes', handler: this.onConfirmRemoval.bind(this) }
              ],
              onConfirm: this.onConfirmRemoval.bind(this),
              onCancel: this.onCancel.bind(this)
            }
          }




              private onConfirmRemoval() {
                let serviceName = `${ this.option }Service`
                this[serviceName].remove({ accountId: this.site.session.acctId, id: this.selectedRecord.id })
                  .then(result => this.onRemoveSuccess(result))
                  .catch(error => this.onRemoveFailure(error))
              }




                  private onRemoveFailure(error) {  console.error('error-476ffd27-ee57-41df-ba2c-bef602720c7e', error)
                    this.site.ui.alert(this.site.settings.messages.offlineRecordRemoved)
                  }




                  private onRemoveSuccess(result) {
                    if (!result.success) this.onRemoveFailure(result)
                    else this.site.ui.channelPrimary({ state: 'success', message: this.site.settings.messages.recordRemoved })
                  }




              private onCancel() {
                // Do nothing, customizable behavior if desired.
              }












  public get results() {
    try { return this._results() }
    catch (error) {
      this.onError({ signature: '1d21d67e-aa34-4118-9552-0ce2e4375c99', details: error })
    }
  }




      private _results() {
        return this[this.option]
      }












  public get title():string {
    try { return this._title() }
    catch (error) {
      this.onError({ signature: 'f1bbc6f6-bb1d-4868-b653-bbae3af28092', details: error })
    }
  }




      private _title() {
        if (this.option === 'questions') return 'Questions'
        if (this.option === 'tags') return 'Categories'
        if (this.option === 'quizes') return 'Quizes'
      }












  public oddEvenClass(index) {
    try { return this._oddEvenClass(index) }
    catch (error) {
      this.onError({ signature: 'c05358cb-d219-4b80-bb62-2e7521edb23b', details: error })
    }
  }




      private _oddEvenClass(index) {
        if (index % 2) return 'even'
        else return 'odd'
      }

}
