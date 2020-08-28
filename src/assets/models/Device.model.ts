import { GenericModel } from '../classes/GenericModel.class';

export class Device extends GenericModel {


  constructor(params?) {
    super(params)
  }












  hookConstructorPost() {
    this._item.modelName = 'device'
    this._item.modelNamePlural = 'devices'
  }

}
