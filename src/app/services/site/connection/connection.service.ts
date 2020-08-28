import { Injectable } from '@angular/core';
import { EventsService } from '../events/events.service';


@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  private _online:boolean


  constructor(
    private events:EventsService
  ) {
    this.online = true
  }












  public get online():boolean {
    return this._online
  }












  public set online(connectedState:boolean) {
    this._online = connectedState
    this.events.onConnectionChange.next({ success: connectedState })
  }

}
