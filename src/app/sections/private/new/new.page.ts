import { Component } from '@angular/core';
import { SiteService } from 'src/app/services/site/site.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ConciseComponent } from 'src/assets/classes/ConciseComponent.class';
import { Breadcrumbs } from 'src/assets/types/Breadcrumbs.type';


@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage extends ConciseComponent {

  public title:string
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
      this.onError({ signature: 'dc23f393-6737-4e50-b7cc-4c2c2e7e8113', details: error })
    }
  }




      private _init() {
        this.title = `Create`
        this.createBreadcrumbs()
      }

      private createBreadcrumbs() {
        this.breadcrumbs = [
          { label: 'New' }
        ]
      }












  public onNewButtonClick(value) {
    try { this._onNewButtonClick(value) }
    catch (error) {
      this.onError({ signature: 'c5365d9d-72fc-40bb-a377-d95369e8f5ce', details: error })
    }
  }




      private _onNewButtonClick(value) {
        this.router.navigate([value], { relativeTo: this.route })
      }

}
