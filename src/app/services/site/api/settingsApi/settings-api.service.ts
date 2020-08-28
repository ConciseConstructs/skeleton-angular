import { Injectable } from '@angular/core';
import { DataModelApiService } from 'src/assets/classes/DataModelApiService.class';
import { HttpClient } from '@angular/common/http';
import { environment as saas } from '../../../../../environments/environment'
import { Settings } from 'src/assets/models/Settings.model';


@Injectable({
  providedIn: 'root'
})
export class SettingsApiService extends DataModelApiService {


  constructor(
    protected http:HttpClient
  ) {
    super(http)
  }












  protected hookConstructorPre() {
    this.endpoint = saas.endpoints.settings
    this.Model = Settings
  }

}
