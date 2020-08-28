import { HttpClient } from '@angular/common/http'
import { StandardReturn } from 'src/assets/types/StandardReturn.type';
import { environment as saas } from '../../environments/environment'
import { HttpOptions } from 'src/assets/classes/HttpOptions.class';
import { IUpdateRequest } from 'src/assets/interfaces/icrud/IUpdateRequest.interface';
import { IReadAllRequest } from 'src/assets/interfaces/icrud/IReadAllRequest.interface';
import { IDeleteRequest } from 'src/assets/interfaces/icrud/IDeleteRequest.interface';


export abstract class DataModelApiService {

  protected url:string
  protected endpoint:string
  protected Model:any


  constructor(
    protected http:HttpClient
  ) {
    this.hookConstructorPre()
    this.checkForRequiredValues()
    this.url = `${ saas.protocol }://${ this.endpoint }.${ saas.apiUrl }/${ saas.stage }`
    this.hookConstructorPost()
  }




      protected hookConstructorPre() { }




      protected checkForRequiredValues() {
        if (!this.endpoint) throw new Error('No value assigned to this.endpoint:string variable.')
        if (!this.Model) throw new Error('No value assigned to this.Model:any variable.')
      }




      protected hookConstructorPost() { }












  public getRecords(accountId:string):Promise<StandardReturn> {
    if (!accountId) throw new Error()
    let options = new HttpOptions()
    options.params = { accountId: accountId } as IReadAllRequest
    return this.http.get(this.url + `/read-all`, options).toPromise() as Promise<StandardReturn>
  }













  public save(item:any):Promise<StandardReturn> {
    let options = new HttpOptions()
    options.params = { item: item }  as IUpdateRequest
    return this.http.put(this.url + `/update`, options).toPromise() as Promise<StandardReturn>
  }












  public update(item:any):Promise<StandardReturn> {
    return this.save(item)
  }












  public remove(params:IDeleteRequest):Promise<StandardReturn> {
    let options = new HttpOptions()
    options.params = params as IDeleteRequest
    return this.http.delete(this.url + '/delete', options).toPromise() as Promise<StandardReturn>
  }

}
