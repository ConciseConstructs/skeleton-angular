import { Component } from '@angular/core';
import { SiteService } from 'src/app/services/site/site.service';
import { ConciseComponent } from 'src/assets/classes/ConciseComponent.class';

@Component({
  selector: 'app-services-mobile-details',
  templateUrl: './services-mobile-details.page.html',
  styleUrls: ['./services-mobile-details.page.scss'],
})
export class ServicesMobileDetailsPage extends ConciseComponent {

  constructor(
    public site:SiteService
  ) {
    super(site)
  }












  public onEstimateLinkClick() {
    this.site.router.navigate(['estimate'])
  }

}
