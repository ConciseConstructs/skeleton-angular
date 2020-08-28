import { Component } from '@angular/core';
import { SiteService } from 'src/app/services/site/site.service';
import { ConciseComponent } from 'src/assets/classes/ConciseComponent.class';

@Component({
  selector: 'app-tools-mobile',
  templateUrl: './tools-mobile.page.html',
  styleUrls: ['./tools-mobile.page.scss'],
})
export class ToolsMobilePage extends ConciseComponent {


  constructor(
    public site:SiteService
  ) {
    super(site)
  }












  public onToolsClick() {
    this.site.router.navigate(['tools', 'tools-clients'])
  }

}
