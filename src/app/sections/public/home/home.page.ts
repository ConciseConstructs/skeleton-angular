import { Component } from '@angular/core';
import { ConciseComponent } from 'src/assets/classes/ConciseComponent.class';
import { SiteService } from 'src/app/services/site/site.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage extends ConciseComponent {

  public navOptions:{ label:string, value:string }[]
  public sliderValue:number


  constructor(
    public site:SiteService
  ) {
    super(site)
    this.pageTitle = 'PLACEHOLDER'
  }




      protected init() {
        this.sliderValue = 0
        this.navOptions = [
          { label: 'Nothing', value: 'nothing'},
        ]
      }












  public onMenuClick(section?:string) {
    if (!section) this.site.router.navigate([this.navOptions[this.sliderValue].value])
    else this.site.router.navigate([section])
  }












  public sliderOptionLabel() {
    if (this.navOptions && this.sliderValue) return this.navOptions[this.sliderValue].label
    else return ''
  }

}
