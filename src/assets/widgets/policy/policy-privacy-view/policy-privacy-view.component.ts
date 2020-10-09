import { Component, OnInit, Input } from '@angular/core';
import { environment as saas } from '../../../../environments/environment'


@Component({
  selector: 'app-policy-privacy-view',
  templateUrl: './policy-privacy-view.component.html',
  styleUrls: ['./policy-privacy-view.component.scss'],
})
export class PolicyPrivacyViewComponent implements OnInit {

  @Input() section:string
  public appTitle:string
  public appWebAddress:string


  constructor() {
    this.appTitle = saas.appTitle
    this.appWebAddress = saas.appWebAddress
  }












  ngOnInit() {}












  public display(section) {
    let styling = { display: null }
    if (this.shouldDisplay(section)) styling.display = 'inline'
    else styling.display = 'none'
    return styling
  }




      private  shouldDisplay(section) {
        if (this.section === 'Privacy' || this.section === 'All') return true
        else if (section === this.section) return true
        else return false
      }

}
