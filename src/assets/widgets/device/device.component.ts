import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Device } from '../../types/Device.type'
import { EventsService } from 'src/app/services/app/events/events.service';


@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss'],
})
export class DeviceComponent {

  @Input() device:Device
  @Output() onRemove:EventEmitter<Device>


  constructor(
    private events:EventsService
  ) {
    this.onRemove = new EventEmitter()
  }












  public onRemoveButtonClick() {
    try { this._onRemoveButtonClick() }
    catch (error) {
      this.events.onError.next({ signature: '7d0560b3-2438-43a2-a30b-cc771829c3a1', details: error })
    }
  }




      private _onRemoveButtonClick() {
        this.onRemove.emit(this.device)
      }

}
