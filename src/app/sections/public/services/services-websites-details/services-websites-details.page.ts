import { Component } from '@angular/core';
import { SiteService } from 'src/app/services/site/site.service';
import { ConciseComponent } from 'src/assets/classes/ConciseComponent.class';


@Component({
  selector: 'app-services-websites-details',
  templateUrl: './services-websites-details.page.html',
  styleUrls: ['./services-websites-details.page.scss'],
})
export class ServicesWebsitesDetailsPage extends ConciseComponent {


  constructor(
    public site:SiteService
  ) {
    super(site)
  }












  public onEstimateLinkClick() {
    this.site.router.navigate(['estimate'])
  }

}
