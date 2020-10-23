import { Component } from '@angular/core';
import { ConciseComponent } from 'src/assets/classes/ConciseComponent.class';
import { AppService } from 'src/app/services/app/app.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage extends ConciseComponent {

  public navOptions:{ label:string, value:string }[]
  public sliderValue:number


  constructor(
    public app:AppService
  ) {
    super(app)
    this.pageTitle = 'PLACEHOLDER'
  }




      protected init() {
        this.sliderValue = 0
        this.navOptions = [
          { label: 'Nothing', value: 'nothing'},
        ]
      }












  public onMenuClick(section?:string) {
    if (!section) this.app.router.navigate([this.navOptions[this.sliderValue].value])
    else this.app.router.navigate([section])
  }












  public sliderOptionLabel() {
    if (this.navOptions && this.sliderValue) return this.navOptions[this.sliderValue].label
    else return ''
  }

}
