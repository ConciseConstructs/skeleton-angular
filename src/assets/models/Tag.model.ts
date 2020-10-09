import { GenericModel } from '../classes/GenericModel.class'


export class Tag extends GenericModel {

  public name?:string
  public description?:string
  public offline?:boolean


  constructor(params?:{ tennantId?:string, id?:string, name?:string, description?:string, questions?:string[], tags?:string[] }) {
    super(params)
  }












  protected hookConstructorPost() {
    this._item.modelName = 'tag'
    this._item.modelNamePlural = 'tags'
    if (!this.links.questions) this.links.questions = { }
  }

}
