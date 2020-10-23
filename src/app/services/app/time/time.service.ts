import { Injectable } from '@angular/core';
import * as timezone from 'moment-timezone'
import { EventsService } from '../events/events.service';


@Injectable({
  providedIn: 'root'
})
export class TimeService {

  public timezone:string
  public timezones:string[]


  constructor(
    private events:EventsService
  ) {
    this.timezones = timezone.tz.names()
  }












  public guessTimeZone() {
    try { return this._guessTimeZone() }
    catch (error) {
      this.events.onError.next({ signature: 'ad4793b3-a02a-4f37-a9f5-27e44665a563', details: error })
    }
  }




      private _guessTimeZone() {
        return timezone.tz.guess()
      }












  public getUtcOffset(timezoneName:string) {
    try { this._getUtcOffset(timezoneName) }
    catch (error) {
      this.events.onError.next({ signature: '6b6fbb9e-72d6-42b8-bf61-72d2908712a3', details: error })
    }
  }




      private _getUtcOffset(timezoneName) {
        return timezone.tz(timezoneName).utcOffset()
      }

}
