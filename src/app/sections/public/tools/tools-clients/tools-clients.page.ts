import { Component } from '@angular/core';
import { SiteService } from 'src/app/services/site/site.service';
import { ConciseComponent } from 'src/assets/classes/ConciseComponent.class';

@Component({
  selector: 'app-tools-clients',
  templateUrl: './tools-clients.page.html',
  styleUrls: ['./tools-clients.page.scss'],
})
export class ToolsClientsPage extends ConciseComponent {

  constructor(
    public site:SiteService
  ) {
    super(site)
  }

}
