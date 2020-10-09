import { Component, OnInit, Input } from '@angular/core';
import { environment as saas } from '../../../../environments/environment'
import { SiteService } from 'src/app/services/site/site.service';


@Component({
  selector: 'app-policy-refund-view',
  templateUrl: './policy-refund-view.component.html',
  styleUrls: ['./policy-refund-view.component.scss'],
})
export class PolicyRefundViewComponent implements OnInit {

  @Input() section:string
  public appTitle:string
  public appWebAddress:string


  constructor(
    private site:SiteService
  ) {
    this.appTitle = saas.appTitle
    this.appWebAddress = saas.appWebAddress
  }












  ngOnInit() {
    console.log('Policy Refund!')
  }












  public display(section) {
    let styling = { display: null }
    if (this.shouldDisplay(section)) styling.display = 'inline'
    else styling.display = 'none'
    return styling
  }




      private  shouldDisplay(section) {
        if (this.section === 'Pricing & Refund' || this.section === 'All') return true
        else if (section === this.section) return true
        else return false
      }












  public onContactClick() {
    this.site.router.navigate(['contact'])
  }

}
