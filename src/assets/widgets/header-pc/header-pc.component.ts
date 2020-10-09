import { Component, Input } from '@angular/core';
import { SiteService } from 'src/app/services/site/site.service';

@Component({
  selector: 'app-header-pc',
  templateUrl: './header-pc.component.html',
  styleUrls: ['./header-pc.component.scss'],
})
export class HeaderPcComponent {

  @Input() title:string
  @Input() displayBackButton:boolean = false


  constructor(
    private site:SiteService
  ) { }












  public onBackLinkClick() {
    this.site.router.navigate(['dashboard'])
  }

}
