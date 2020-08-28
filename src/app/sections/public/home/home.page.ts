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
  }




      protected init() {
        this.sliderValue = 0
        this.navOptions = [
          { label: 'Services', value: 'services'},
          { label: 'Tools', value: 'tools' },
          { label: 'Estimate', value: 'estimate' },
          { label: 'Contact', value: 'contact' },
          { label: 'Payment', value: 'payment' },
          { label: 'Prices & Policies', value: 'policies' },
        ]
      }












  public onMenuClick(section?:string) {
    if (!section) this.site.router.navigate([this.navOptions[this.sliderValue].value])
    else this.site.router.navigate([section])
  }












  public sliderOptionLabel() {
    return this.navOptions[this.sliderValue].label
  }

}
