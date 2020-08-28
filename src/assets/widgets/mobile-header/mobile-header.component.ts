import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { EventsService } from 'src/app/services/site/events/events.service';


@Component({
  selector: 'app-mobile-header',
  templateUrl: './mobile-header.component.html',
  styleUrls: ['./mobile-header.component.scss'],
})
export class MobileHeaderComponent {

  @Input() title:string
  @Input() displayBackButton:boolean


  constructor(
    private router:Router,
    private platform:Platform,
    private events:EventsService
  ) {
  }












  public onButtonClick(value) {
    try { this._onButtonClick(value) }
    catch (error) {
      this.events.onError.next({ signature: '9720d63f-3275-4660-ae6a-a82a21f01eef', details: error })
    }
  }




      private _onButtonClick(value) {
        this.router.navigate([value])
      }












  public get displayTitle():boolean {
    try { return this._displayTitle() }
    catch (error) {
      this.events.onError.next({ signature: '8270865f-b2aa-445a-9217-b8af55c01b7e', details: error })
    }
  }




      private _displayTitle():boolean {
        if (this.platform.is('ios') && this.title === 'Dashboard') return false
        else return true
      }

}
