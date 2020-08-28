import { Component } from '@angular/core';
import { SiteService } from 'src/app/services/site/site.service';
import { ConciseComponent } from 'src/assets/classes/ConciseComponent.class';


@Component({
  selector: 'app-ownership',
  templateUrl: './ownership.page.html',
  styleUrls: ['./ownership.page.scss'],
})
export class OwnershipPage extends ConciseComponent {

  constructor(
    public site:SiteService
  ) {
    super(site)
  }

}
