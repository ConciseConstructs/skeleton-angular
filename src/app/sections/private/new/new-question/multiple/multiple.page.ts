import { Component } from '@angular/core';
import { SiteService } from 'src/app/services/site/site.service';
import { Question } from 'src/assets/models/Question.model';
import { QuestionsProcessingService } from 'src/app/services/processors/questions-processing/questions.processing.service';
import { ConciseComponent } from 'src/assets/classes/ConciseComponent.class';
import { Breadcrumbs } from 'src/assets/types/Breadcrumbs.type';


@Component({
  selector: 'app-multiple',
  templateUrl: './multiple.page.html',
  styleUrls: ['./multiple.page.scss'],
})
export class MultiplePage extends ConciseComponent {

  public record:Question
  public breadcrumbs:Breadcrumbs

  constructor(
    public site:SiteService,
    private service:QuestionsProcessingService
  ) {
    super(site)
  }












  public init() {
    try { this._init() }
    catch (error) {
      this.onError({ signature: 'aee52a9c-3fab-4e0e-8d69-17ce5dd99822', details: error })
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
          { label: 'Multiple Choice' }
        ]
      }












  public onCreateButtonClick(record) {
    try { this._onCreateButtonClick(record) }
    catch (error) {
      this.onError({ signature: 'bba1818f-5fa0-4871-bb50-a0bcd354d000', details: error })
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




          private onSaveQuestionFailure(error) {  console.error('error-d5ed6b52-ac3a-49b2-a881-57b2f14f1e21', error)
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
