import { GenericModel } from '../classes/GenericModel.class'
import { ScheduleDetails } from '../types/ScheduleDetails.type'


export class Quiz extends GenericModel {

  public name?:string
  public description?:string
  public scheduled?:boolean
  public schedule?:ScheduleDetails
  public questionAmount:number
  public streak:number
  public offline?:boolean


  constructor(params?:{ id?:string, name?:string, description?:string, questions?:string[], tags?:string[] }) {
    super(params)
  }












  protected hookConstructorPost() {
    this._item.modelName = 'quiz'
    this._item.modelNamePlural = 'quizes'
    if (!this.schedule) this.schedule = { rate: null, unit: null, time: null, nextQuizUTC: null }
    if (!this.questionAmount) this.questionAmount = 5
  }












  public get tags():string[] {
    if (this.links.tags) return Object.keys(this.links.tags)
    else return [ ]
  }












  public set tags(tagIds:string[]) {
    this.links.tags = { }
    tagIds.forEach(tagId => this.links.tags[tagId] = null)
  }












  // public get questions():string[] {
  //   if (this.links.questions) return Object.keys(this.links.questions)
  //   else return [ ]
  // }












  // public set questions(questionIds) {
  //   if (!questionIds) return
  //   this.links.questions = { }
  //   questionIds.forEach(questionId => this.links.questions[questionId] = null)
  // }

}
