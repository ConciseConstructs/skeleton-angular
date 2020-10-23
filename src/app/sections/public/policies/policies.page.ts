import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app/app.service';
import { ConciseComponent } from 'src/assets/classes/ConciseComponent.class';


@Component({
  selector: 'app-policies',
  templateUrl: './policies.page.html',
  styleUrls: ['./policies.page.scss'],
})
export class PoliciesPage extends ConciseComponent {

  public items:any[]
  public section:string
  public policyTitle:string


  constructor(
    public app:AppService
  ) {
    super(app)
  }












  protected init() {
    this.section = 'All'
    this.items = [ ]
    this.items.push(this.createPrivacyOptions())
    this.items.push(this.createRefundOptions())
  }




      private createPrivacyOptions() {
        return {
          label: 'Privacy',
          items: [
            { label: 'All' },
            { label: 'Preface' },
            { label: 'Log Files' },
            { label: 'Cookies' },
            { label: 'Privacy Policies' },
            { label: 'Third Party' },
            { label: 'User Information' },
            { label: 'Device Features' },
            { label: 'Online Policy' },
            { label: 'Consent' }
          ]
        }
      }




      private createRefundOptions() {
        return {
          label: 'Pricing & Refund',
          items: [
            { label: 'All' },
            { label: 'Preface' },
            { label: 'Hosting' },
            { label: 'Domains' },
            { label: 'Development' }
          ]
        }
      }












  public onMenuItemChange(event) {
    let value = event.target.textContent
    if (value === 'Back') return
    this.section = value
    if (value === 'Privacy' || value === 'Pricing & Refund') this.policyTitle = value
  }

}
