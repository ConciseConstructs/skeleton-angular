import { Component, Input } from '@angular/core';
import { AppService } from 'src/app/services/app/app.service';

@Component({
  selector: 'app-header-pc',
  templateUrl: './header-pc.component.html',
  styleUrls: ['./header-pc.component.scss'],
})
export class HeaderPcComponent {

  @Input() title:string
  @Input() displayBackButton:boolean = false


  constructor(
    private app:AppService
  ) { }












  public onBackLinkClick() {
    this.app.router.navigate(['dashboard'])
  }

}
