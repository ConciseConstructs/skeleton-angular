import { GenericModel } from '../classes/GenericModel.class';

export class Settings extends GenericModel {

  public streak:number
  public timezone:string


  constructor(params?) {
    super(params)
  }












  hookConstructorPost() {
    this._item.modelName = 'setting'
    this._item.modelNamePlural = 'settings'
    this.id = 'default'
  }

}
