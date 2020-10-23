import { Injectable } from '@angular/core';
import * as moment from 'moment'
import { EventsService } from '../../app/events/events.service';


@Injectable({
  providedIn: 'root'
})
export class ScheduleProcessingService {


  constructor(
    private events:EventsService
  ) { }












  public nextQuizForDaysUnit(params:{ rate:number, time?:any, unit?:string }) {
    try { return this._nextQuizForDaysUnit(params) }
    catch (error) {
      this.events.onError.next({ signature: '70dc604b-7e20-4655-81fd-6b8d18d59539', details: error })
    }
  }




      private _nextQuizForDaysUnit(params) {
        params.unit = params.unit || 'days'
        return this.determineNextQuiz(params)
      }












  public nextQuizForMonthsUnit(params:any) {
    try { this._nextQuizForMonthsUnit(params) }
    catch (error) {
      this.events.onError.next({ signature: '73150bc1-2f6a-4755-a811-247c385c57f6', details: error })
    }
  }




      private _nextQuizForMonthsUnit(params) {
        params.unit = 'months'
        return this.determineNextQuiz(params)
      }












  private determineNextQuiz(params) {
    let now, target, hours, minutes
    now = moment()
    target = now.add(params.rate, params.unit)
    if (params.time)
      if (params.time.constructor === String) [ hours, minutes ] = this.parseHoursMinutesFromDateTimeString(params.time)
      else [ hours, minutes ] = this.parseHoursMinutesFromDateObject(params.time)
    return this.setMilitaryTime({ hours: hours, minutes: minutes, dateTimeUTC: target })
  }




      private parseHoursMinutesFromDateTimeString(dateTime:string) {
        let date, time, hours, minutes
        if (dateTime.includes('T')) [ date, time ] = dateTime.split('T')
        else time = dateTime as string
        [ hours, minutes ] = time.split(':')
        return [ parseInt(hours), parseInt(minutes) ]
      }




      private parseHoursMinutesFromDateObject(time) {
        let hours = time.getHours()
        let minutes = time.getMinutes()
        return [ hours, minutes ]
      }












  public nextQuizForWeekdayUnit(params:any) {
    try { return this._nextQuizForWeekdayUnit(params) }
    catch (error) {
      this.events.onError.next({ signature: '2c4f10fa-357d-468f-a18c-55f230139232', details: error })
    }
  }




      private _nextQuizForWeekdayUnit(params) {
        let dayOfWeek, hours, minutes
        dayOfWeek = this.nextDayOfWeekInstance(params.unit)
        if (params.rate > 1) dayOfWeek = dayOfWeek.add(((params.rate -1) * 7), 'days')
        if (params.time) [ hours, minutes ] = this.getMinuteAndHourValues(params)
        if (hours !== undefined && minutes !== undefined && dayOfWeek !== undefined) return this.setMilitaryTime({ hours: hours, minutes: minutes, dateTimeUTC: dayOfWeek.valueOf() })
      }




          private nextDayOfWeekInstance(preferredWeekday:string) {
            if (!preferredWeekday) return
            let now = moment()
            let weekdayInstance = moment().day(preferredWeekday)
            if (weekdayInstance < now) return weekdayInstance.add(7, 'days')
            else return weekdayInstance
          }




          private getMinuteAndHourValues(params) {
            if (params.time.constructor === String) return this.getMinutesHoursByStringValue(params)
            else return this.getMinutesHoursByDateObject(params)
          }




              private getMinutesHoursByStringValue(params) {
                let dateTime = new Date(params.time)
                if (dateTime.valueOf()) return this.parseFormValue(params)
                else return this.parseSavedValue(params)
              }




                  private parseFormValue(params) {
                      let hours = new Date(params.time).getHours()
                      let minutes = new Date(params.time).getMinutes()
                      return [ hours, minutes ]
                  }



                  private parseSavedValue(params) {
                    let [ hours, minutes ] = params.time.split(':')
                    let dateTime = new Date()
                    dateTime.setHours(hours)
                    dateTime.setMinutes(minutes)
                    hours = dateTime.getHours()
                    minutes = dateTime.getMinutes()
                    return [ hours, minutes ]
                  }




              private getMinutesHoursByDateObject(params) {
                return [
                  params.time.getHours(),
                  params.time.getMinutes()
                ]
              }

















  private setMilitaryTime(params:{ hours:number, minutes:number, dateTimeUTC?:number }) {
    let date = moment(params.dateTimeUTC)
    let militaryTime = date.hour(params.hours)
    militaryTime.minutes(params.minutes)
    militaryTime.seconds(0)
    militaryTime.milliseconds(0)
    return militaryTime
  }












  public prepareForPersistence(params) {
    try { return this._prepareForPersistence(params) }
    catch (error) {
      this.events.onError.next({ signature: 'aa6ff761-4a05-4b07-ac78-6454506e5cf6', details: error })
    }
  }



      private _prepareForPersistence(params) {
        let scheduleObject = this.makeScheduleObject(params)
        if (params.time.constructor === Date) scheduleObject.time = this.createScheduleTimeByDateObject(params)
        else scheduleObject.time = this.createScheduleTimeByStringType(params)
        return scheduleObject
      }




          private makeScheduleObject(params) {
            return {
              rate: params.rate,
              unit: params.unit,
              nextQuizUTC: params.nextQuiz.valueOf(),
            } as any
          }




          private createScheduleTimeByDateObject(params) {
            return `${ params.time.getHours() }:${ params.time.getMinutes() }`

          }




          private createScheduleTimeByStringType(params) {
              if (params.time.length > 5) return `${ new Date(params.time).getHours() }:${ new Date(params.time).getMinutes() }`
              else return params.time
          }

}
