import { id } from '../utilities/shortId';


export class Error {

  public id:string
  public saas:string
  public createdAt:number
  public accountId:string
  public userId?:string
  public signature:string
  public details:any


  constructor() {
    this.id = id()
  }

}
