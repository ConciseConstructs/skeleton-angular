import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment as saas } from '../../../../../environments/environment'
import { DataModelApiService } from 'src/assets/classes/DataModelApiService.class';
import { Tag } from 'src/assets/models/Tag.model';


@Injectable({
  providedIn: 'root'
})
export class TagsApiService extends DataModelApiService {

  protected endpoint:string


  constructor(
    protected http:HttpClient
  ) {
    super(http)
  }












  protected hookConstructorPre() {
    this.endpoint = saas.endpoints.tags
    this.Model = Tag
  }

}
