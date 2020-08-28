import { Component, OnInit } from '@angular/core';
import { SiteService } from 'src/app/services/site/site.service';
import { IconSubtitled } from 'src/assets/types/IconSubtitled.type';
import { ConciseComponent } from 'src/assets/classes/ConciseComponent.class';


@Component({
  selector: 'app-tools',
  templateUrl: './tools.page.html',
  styleUrls: ['./tools.page.scss'],
})
export class ToolsPage extends ConciseComponent {

  public icons:IconSubtitled[]


  constructor(
    public site:SiteService
  ) {
    super(site)
  }












  protected init() {
    this.icons = [
      { subtitle: 'Platforms', imageUrl: '/assets/images/tools-platform.png', alt: 'Platforms Icon', url: ['tools', 'tools-platforms'] },
      { subtitle: 'Mobile', imageUrl: '/assets/images/tools-mobile.png', alt: 'Mobile Frameworks Icon', url: ['tools', 'tools-mobile'] },
      { subtitle: 'Client-Side', imageUrl: '/assets/images/tools-client.png', alt: 'Client-Side Frameworks Icon', url: ['tools', 'tools-clients'] },
      { subtitle: 'Server-Side', imageUrl: '/assets/images/tools-server.png', alt: 'Server-Side Languages Icon', url: ['tools', 'tools-servers'] },
      { subtitle: 'Databases', imageUrl: '/assets/images/tools-databases.png', alt: 'Database Tools Icon', url: ['tools', 'tools-databases'] },
    ]
  }












  public onOutput(urlArray:string[]) {
    this.site.router.navigate(urlArray)
  }

}
