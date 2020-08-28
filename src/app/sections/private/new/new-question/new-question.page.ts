import { Component } from '@angular/core';
import { SiteService } from 'src/app/services/site/site.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ConciseComponent } from 'src/assets/classes/ConciseComponent.class';
import { Breadcrumbs } from 'src/assets/types/Breadcrumbs.type';


@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.page.html',
  styleUrls: ['./new-question.page.scss'],
})
export class NewQuestionPage extends ConciseComponent {

  public options:['text', 'boolean', 'multi']
  public title:string
  public type:'text'|'boolean'|'multi'
  public breadcrumbs:Breadcrumbs


  constructor(
    public site:SiteService,
    private router:Router,
    protected route:ActivatedRoute
  ) {
    super(site)
  }












  protected init() {
    try { this._init() }
    catch (error) {
      this.onError({ signature: 'signatureString', details: error })
    }
  }




      private _init() {
        this.title = `Choose Type`
        this.createBreadcrumbs()
      }

      private createBreadcrumbs() {
        this.breadcrumbs = [
          { label: 'New', url: ['new'] },
          { label: 'Question' }
        ]
      }












  public onSelectValue(event?:CustomEvent) {
    try { this._onSelectValue(event) }
    catch (error) {
      this.onError({ signature: '8a002c81-cb7b-40ad-b251-01fa32f7204f', details: error })
    }
  }




      private _onSelectValue(event) {
        if (event) this.type = event.detail.value
        this.router.navigate([this.type], { relativeTo: this.route })
      }

}
