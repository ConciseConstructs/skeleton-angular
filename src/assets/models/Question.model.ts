import { QuestionType } from '../types/QuestionType.type'
import { GenericModel } from '../classes/GenericModel.class'


export class Question extends GenericModel {

  public question?:string
  public answer?:any
  public userAnswer?:any
  public correct?:boolean
  public streak:number
  public bucket:'a'|'b'|'c'
  public reason?:string
  public type?:QuestionType
  public links:{ tags:any, quizes:any }
  public selected?:boolean
  public options?:{ answer:string, correct:boolean, selected?:boolean }[]
  public offline?:boolean


  constructor(params?:{ id?:string, question?:string, type?:QuestionType, links:{ tags?:string[], quizes?:string[] } }) {
    super(params)
  }












  protected hookConstructorPost() {
    this._item.modelName = 'question'
    this._item.modelNamePlural = 'questions'
    if (!this.links.tags) this.links.tags = { }
    if (!this.links.quizes) this.links.quizes = { }
    if (!this.bucket) this.bucket = 'a'
    if (!this.streak) this.streak = 0
  }

}
