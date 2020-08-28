import { Component } from '@angular/core';
import { SiteService } from 'src/app/services/site/site.service';
import { ConciseComponent } from 'src/assets/classes/ConciseComponent.class';

@Component({
  selector: 'app-tools-platforms',
  templateUrl: './tools-platforms.page.html',
  styleUrls: ['./tools-platforms.page.scss'],
})
export class ToolsPlatformsPage extends ConciseComponent {

  constructor(
    public site:SiteService
  ) {
    super(site)
  }

}
