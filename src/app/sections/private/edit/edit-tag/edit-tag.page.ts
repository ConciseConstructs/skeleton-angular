import { Component } from '@angular/core';
import { SiteService } from 'src/app/services/site/site.service';
import { ActivatedRoute } from '@angular/router';
import { TagsProcessingService } from 'src/app/services/processors/tags-processing/tags.processing.service';
import { FormGroup } from '@angular/forms';
import { Tag } from 'src/assets/models/Tag.model';
import { ConciseComponent } from 'src/assets/classes/ConciseComponent.class';
import { Breadcrumbs } from 'src/assets/types/Breadcrumbs.type';


@Component({
  selector: 'app-edit-tag',
  templateUrl: './edit-tag.page.html',
  styleUrls: ['./edit-tag.page.scss'],
})
export class EditTagPage extends ConciseComponent {

  public form:FormGroup
  public record:Tag
  public breadcrumbs:Breadcrumbs


  constructor(
    public site:SiteService,
    private service:TagsProcessingService,
    protected route:ActivatedRoute
  ) {
    super(site)
  }












  protected init() {
    try { this._init() }
    catch (error) {
      this.onError({ signature: '5eab3f85-8df1-40ce-9173-9a95c98746e8', details: error })
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












  protected loadRecord(paramMap) {
    try { this._loadRecord(paramMap) }
    catch (error) {
      this.onError({ signature: 'fb4cc9dc-6b73-44ee-a613-f301169dfe60', details: error })
    }
  }




      private _loadRecord(paramMap) {
        let id = paramMap.get('id')
        this.record = this.service.getId(id)
        this.record._item.tennantId = this.site.session.acctId
        if (!this.record) this.onNoRecordFound()
      }





          private onNoRecordFound() {
            this.site.ui.alert(this.site.settings.messages.noRecordFoundRedirectToDashboard)
            this.site.router.navigate(['dashboard'])
          }












  public onUpdateButtonClick(keyValues) {
    try { this._onUpdateButtonClick(keyValues) }
    catch (error) {
      this.onError({ signature: 'dc84f78c-80b1-48b7-ac82-dde68ea2a273', details: error })
    }
  }




      private _onUpdateButtonClick(keyValues) {
        this.refreshRecordValues(keyValues)
        this.service.update(this.record)
          .then(result => this.onUpdateSuccess(result))
          .catch(error => this.onUpdateFailure(error))
      }




          private refreshRecordValues(keyValues) {
            for (let [ property, value ] of Object.entries(keyValues)) this.record[property] = value
          }




          private onUpdateFailure(error) {  console.error('error-631f16fc-7f35-4c6e-974c-71fe422248fa', error)
            this.site.ui.alert(this.site.settings.messages.offlineRecordSaved)
            this.navigateBack()
          }




          private onUpdateSuccess(result) {
            if (!result.success) this.onUpdateFailure(result)
            else {
              this.site.ui.channelPrimary({ state: 'success', message: this.site.settings.messages.recordSaved })
              this.navigateBack()
            }
          }

}
