import { Component } from '@angular/core';
import { SiteService } from 'src/app/services/site/site.service';
import { ConciseComponent } from 'src/assets/classes/ConciseComponent.class';

@Component({
  selector: 'app-tools-databases',
  templateUrl: './tools-databases.page.html',
  styleUrls: ['./tools-databases.page.scss'],
})
export class ToolsDatabasesPage extends ConciseComponent {

  constructor(
    public site:SiteService
  ) {
    super(site)
  }

}
