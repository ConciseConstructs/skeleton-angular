import { Component, OnInit } from '@angular/core';
import { SiteService } from 'src/app/services/site/site.service';
import { TagsProcessingService } from '../../../../services/processors/tags-processing/tags.processing.service'
import { Router } from '@angular/router';
import { ConciseComponent } from 'src/assets/classes/ConciseComponent.class';
import { Breadcrumbs } from 'src/assets/types/Breadcrumbs.type';
import { Tag } from 'src/assets/models/Tag.model';


@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.page.html',
  styleUrls: ['./new-category.page.scss'],
})
export class NewCategoryPage extends ConciseComponent {

  public breadcrumbs:Breadcrumbs
  public title:string
  public record:Tag


  constructor(
    public site:SiteService,
    private service:TagsProcessingService,
    private router:Router
  ) {
    super(site)
  }












  init() {
    try { this._init() }
    catch (error) {
      this.onError({ signature: '870173f6-962c-482a-a216-6db3b11d5502', details: error })
    }
  }




      private _init() {
        this.record = this.service.createNewInstance()
        this.title = `Category / Tag Name`
        this.backUrl = 'dashboard'
        this.createBreadcrumbs()
      }




          private createBreadcrumbs() {
            this.breadcrumbs = [
              { label: 'New', url: ['new'] },
              { label: 'Category' }
            ]
          }













  public onCreateButtonClick(record) {
    try { this._onCreateButtonClick(record) }
    catch (error) {
      this.onError({ signature: 'cd02a851-bdf7-476d-aa1d-55cdc0fd20e3', details: error })
    }
  }



      private _onCreateButtonClick(record) {
        this.service.save(record)
          .then(result => this.onSaveTagSuccess(result))
          .catch(error => this.onSaveTagFailure(error))
      }





          private onSaveTagFailure(error) {  console.error('error-fc781f54-5e51-4753-8615-9919c8b586da', error)
            this.site.ui.alert(this.site.settings.messages.offlineRecordSaved)
            this.navigateBack()
          }




          private onSaveTagSuccess(result) {
            if (!result.success) this.onSaveTagFailure(result)
            else {
              this.site.ui.channelPrimary({ state: 'success', message: this.site.settings.messages.recordSaved })
              this.navigateBack()
            }
          }

}
