import { Component } from '@angular/core';
import { SiteService } from '../../../services/site/site.service';
import { ConciseComponent } from 'src/assets/classes/ConciseComponent.class';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage extends ConciseComponent {



  constructor(
    public site:SiteService,
  ) {
    super(site)
  }












  protected init() {
    try { this._init() }
    catch (error) {
      this.onError({ signature: 'error-1103aa4c-28f1-4bc9-8679-6b1b1dc16fe8', details: error })
    }
  }




      private _init() { }













  public onNavigateButtonClick(location) {
    try { this.site.router.navigate([location]) }
    catch (error) {
      this.onError({ signature: 'e05b7f92-a136-48ba-b921-25b73c7c0b7f', details: error })
    }
  }

}
