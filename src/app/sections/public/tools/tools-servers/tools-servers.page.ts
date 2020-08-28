import { Component } from '@angular/core';
import { SiteService } from 'src/app/services/site/site.service';
import { ConciseComponent } from 'src/assets/classes/ConciseComponent.class';

@Component({
  selector: 'app-tools-servers',
  templateUrl: './tools-servers.page.html',
  styleUrls: ['./tools-servers.page.scss'],
})
export class ToolsServersPage extends ConciseComponent {

  constructor(
    public site:SiteService
  ) {
    super(site)
  }

}
