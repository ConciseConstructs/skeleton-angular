import { Component } from '@angular/core';
import { SiteService } from 'src/app/services/site/site.service';
import { QuestionsProcessingService } from 'src/app/services/processors/questions-processing/questions.processing.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Question } from 'src/assets/models/Question.model';
import { ConciseComponent } from 'src/assets/classes/ConciseComponent.class';
import { Breadcrumbs } from 'src/assets/types/Breadcrumbs.type';


@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.page.html',
  styleUrls: ['./edit-question.page.scss'],
})
export class EditQuestionPage extends ConciseComponent {

  public record:Question
  public breadcrumbs:Breadcrumbs


  constructor(
    public site:SiteService,
    protected route:ActivatedRoute,
    private service:QuestionsProcessingService,
  ) {
    super(site)
  }












  protected init() {
    try { this._init() }
    catch (error) {
      this.onError({ signature: 'bbbff1f7-559c-4eaf-bfb2-d904f5b03b81', details: error })
    }
  }

  private _init() {
    this.backUrl = 'search'
    this.createBreadcrumbs()
  }

  private createBreadcrumbs() {
    this.breadcrumbs = [
      { label: 'Browse', url: ['search'] },
      { label: 'Edit' }
    ]
  }












  protected loadRecord(paramMap:ParamMap) {
    try { this._loadRecord(paramMap) }
    catch (error) {
      this.onError({ signature: '964ee37d-9fb3-4003-85ea-9e8f4cf5857e', details: error })
    }
  }




      private _loadRecord(paramMap) {
        let id = paramMap.get('id')
        this.record = this.service.getId(id)
        if (!this.record) this.onNoRecordFound()
      }





      private onNoRecordFound() {
        this.site.ui.alert(this.site.settings.messages.noRecordFoundRedirectToDashboard)
        this.site.router.navigate(['dashboard'])
      }













  public onUpdateButtonClick(event) {
    try { this._onUpdateButtonClick(event) }
    catch (error) {
      this.onError({ signature: '2d1dfa8a-2336-430f-a7e3-6b9306918c6c', details: error })
    }
  }




      private _onUpdateButtonClick(event) {
        this.resetTags(event)
        this.bindNewValuesToRecord(event)
        this.service.update(this.record)
          .then(result => this.onSaveQuestionSuccess(result))
          .catch(error => this.onSaveQuestionFailure(error))
      }




          private resetTags(event) {
            this.record.links.tags = { }
            if (event.tags) event.tags.forEach(tag => this.record.links.tags[tag.id] = null)
            delete event.tags
          }




          private bindNewValuesToRecord(event) {
            for (let [ property, value ] of Object.entries(event)) this.record[property] = value
          }




          public onSaveQuestionFailure(error) {  console.error('error-bbee571d-4faf-4ffe-b478-0b4f840f10d6', error)
            this.site.ui.alert(this.site.settings.messages.offlineRecordSaved)
            this.navigateBack()
          }




          public onSaveQuestionSuccess(result) {
            if (!result.success) this.onSaveQuestionFailure(result)
            this.site.ui.channelPrimary({ state: 'success', message: this.site.settings.messages.recordSaved })
            this.navigateBack()
          }

}
