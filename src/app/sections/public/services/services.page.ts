import { Component, OnInit } from '@angular/core';
import { SiteService } from 'src/app/services/site/site.service';
import { IconSubtitled } from 'src/assets/types/IconSubtitled.type';
import { ConciseComponent } from 'src/assets/classes/ConciseComponent.class';


@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
})
export class ServicesPage extends ConciseComponent {


  public icons:IconSubtitled[]


  constructor(
    public site:SiteService
  ) {
    super(site)
  }












  protected init() {
    this.icons = [
      { subtitle: 'Mobile Apps', imageUrl: '/assets/images/services-mobile.png', alt: 'Mobile Apps Icon', url: ['services', 'services-mobile-details' ] },
      { subtitle: 'Websites / PWAs', imageUrl: '/assets/images/services-websites.png', alt: 'Websites and Progressive Web Apps Icon', url: [`services`, 'services-websites-details'] },
      { subtitle: 'Hosting', imageUrl: '/assets/images/services-hosting.png', alt: 'Hosting Icon', url: [`services`, 'services-hosting-details'] },
      { subtitle: 'Domain Names', imageUrl: '/assets/images/services-domains.png', alt: 'Domain Names Icon', url: [`services`, 'services-domains-details'] },
    ]
  }












  public onOutput(urlArray:string[]) {
    this.site.router.navigate(urlArray)
  }

}
