import { Component, Input } from '@angular/core';
import { Breadcrumbs } from 'src/assets/types/Breadcrumbs.type';
import { SiteService } from 'src/app/services/site/site.service';


@Component({
  selector: 'app-pc-header',
  templateUrl: './pc-header.component.html',
  styleUrls: ['./pc-header.component.scss'],
})
export class PcHeaderComponent {

  @Input() breadcrumbs:Breadcrumbs


  constructor(
    private site:SiteService
  ) { }












  public onCrumbClick(crumb) {
    try { this._onCrumbClick(crumb) }
    catch (error) {
      this.site.events.onError.next({ signature: '81ce636c-4e78-4a4e-98f5-4d66a5dc4808', details: error })
    }
  }




      private _onCrumbClick(crumb) {
        if (crumb.url) this.site.router.navigate(crumb.url)
      }












  public onDashboardClick() {
    try { this._onDashboardClick() }
    catch (error) {
      this.site.events.onError.next({ signature: 'fb916c9e-06b9-43da-b522-f1cf451da2f3', details: error })
    }
  }




      private _onDashboardClick() {
        this.site.router.navigate(['dashboard'])
      }












  public onSearchButtonClick() {
    try { this._onSearchButtonClick() }
    catch (error) {
      this.site.events.onError.next({ signature: '116186a8-d365-4256-bbe4-083f84860b57', details: error })
    }
  }




      private _onSearchButtonClick() {
        this.site.router.navigate(['search'])
      }












  public onAddButtonClick() {
    try { this._onAddButtonClick() }
    catch (error) {
      this.site.events.onError.next({ signature: '0cc702f0-5df2-46fb-9a68-0e64c074c17f', details: error })
    }
  }




      private _onAddButtonClick() {
        this.site.router.navigate(['new'])
      }












  public onSettingsButtonClick() {
    try { this._onSettingsButtonClick() }
    catch (error) {
      this.site.events.onError.next({ signature: '910ffcff-dc60-44e5-aa1b-0c5b0133ad24', details: error })
    }
  }




      private _onSettingsButtonClick() {
        this.site.router.navigate(['settings'])
      }












  public isClickable(crumb):string {
    try { return this._isClickable(crumb) }
    catch (error) {
      this.site.events.onError.next({ signature: 'b20ba7e0-2a8b-4330-acaa-e1d6cc8d6526', details: error })
    }
  }




      private _isClickable(crumb):string {
        if (crumb.url) return 'clickable'
        else return ''
      }

}
