export type ScheduleDetails = {
  nextQuizUTC:number
  rate:number
  unit:'day'|'month'|'monday'|'tuesday'|'wednesday'|'thursday'|'friday'|'saturday'|'sunday'
  time:Date|number|string
}