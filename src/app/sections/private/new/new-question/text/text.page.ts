import { Component } from '@angular/core';
import { SiteService } from 'src/app/services/site/site.service';
import { QuestionsProcessingService } from 'src/app/services/processors/questions-processing/questions.processing.service';
import { ConciseComponent } from 'src/assets/classes/ConciseComponent.class';
import { Question } from 'src/assets/models/Question.model';
import { Breadcrumbs } from 'src/assets/types/Breadcrumbs.type';


@Component({
  selector: 'app-text',
  templateUrl: './text.page.html',
  styleUrls: ['./text.page.scss'],
})
export class TextPage extends ConciseComponent {

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
      this.onError({ signature: 'signatureString', details: error })
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
          { label: 'Text' }
        ]
      }












  public onCreateButtonClick(record) {
    try { this._onCreateButtonClick(record) }
    catch (error) {
      this.onError({ signature: '69805dc3-1e16-4d74-a394-35359cdbf345', details: error })
    }
  }




      private _onCreateButtonClick(record) {
        this.service.save(record)
          .then(result => this.onSaveRecordSuccess(result))
          .catch(error => this.onSaveRecordFailure(error))
      }





          private onSaveRecordFailure(error) {  console.error('error-e6bf8706-b45f-4964-99b5-a9b9e55e55b0', error)
            this.site.ui.alert(this.site.settings.messages.offlineRecordSaved)
            this.navigateBack()
          }




          private onSaveRecordSuccess(result) {
            if (!result.success) this.onSaveRecordFailure(result)
            else {
              this.site.ui.channelPrimary({ state: 'success', message: this.site.settings.messages.recordSaved })
              this.navigateBack()
            }
          }

}
