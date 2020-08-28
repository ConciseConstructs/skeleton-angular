import { Component } from '@angular/core';
import { SiteService } from 'src/app/services/site/site.service';
import { QuestionsProcessingService } from 'src/app/services/processors/questions-processing/questions.processing.service';
import { Question } from 'src/assets/models/Question.model';
import { ConciseComponent } from 'src/assets/classes/ConciseComponent.class';
import { Breadcrumbs } from 'src/assets/types/Breadcrumbs.type';


@Component({
  selector: 'app-boolean',
  templateUrl: './boolean.page.html',
  styleUrls: ['./boolean.page.scss'],
})
export class BooleanPage extends ConciseComponent {

  public breadcrumbs:Breadcrumbs
  public record:Question


  constructor(
    public site:SiteService,
    private service:QuestionsProcessingService
  ) {
    super(site)
  }












  public init() {
    try { this._init() }
    catch (error) {
      this.onError({ signature: 'd6b818df-bd44-499d-9ee3-e48689ae7d6b', details: error })
    }
  }




      private _init() {
        this.record = this.service.createNewInstance()
        this.backUrl = 'dashboard'
        this.createBreadcrumbs()
      }

      private createBreadcrumbs() {
        this.breadcrumbs = [
          { label: 'New', url: ['new'] },
          { label: 'Question', url: ['new', 'question'] },
          { label: 'True / False' }
        ]
      }












  public onCreateButtonClick(record) {
    try { this._onCreateButtonClick(record) }
    catch (error) {
      this.onError({ signature: 'ad634eb2-7d37-483b-b47f-b82229db4c71', details: error })
    }
  }




      private _onCreateButtonClick(record) {
        if (record.tags) this.transformTagsArrayToLinks(record)
        this.service.save(record)
          .then(result => this.onSaveQuestionSuccess(result))
          .catch(error => this.onSaveQuestionFailure(error))
      }




          private transformTagsArrayToLinks(record) {
            record.links.tags = { }
            if (this.site.deviceClasses.includes('mobile')) record.tags.forEach(tagId => record.links.tags[tagId] = null)
            else record.tags.forEach(tag => record.links.tags[tag.id] = null)
            delete (record as any).tags
          }




          private onSaveQuestionFailure(error) {  console.error('error-4d747071-c9b5-4613-9bcc-38b61f03a06b', error)
            this.site.ui.alert(this.site.settings.messages.offlineRecordSaved)
            this.navigateBack()
          }




          private onSaveQuestionSuccess(result) {
            if (!result.success) this.onSaveQuestionFailure(result)
            else {
              this.site.ui.channelPrimary({ state: 'success', message: this.site.settings.messages.recordSaved })
              this.navigateBack()
            }
          }

}
