import { Injectable } from '@angular/core';
import { DataModelApiService } from 'src/assets/classes/DataModelApiService.class';
import { HttpClient } from '@angular/common/http';
import { environment as saas } from '../../../../../environments/environment'
import { Device } from 'src/assets/models/Device.model';

@Injectable({
  providedIn: 'root'
})
export class DevicesApiService extends DataModelApiService {


  constructor(
    protected http:HttpClient
  ) {
    super(http)
  }












  protected hookConstructorPre() {
    this.endpoint = saas.endpoints.devices
    this.Model = Device
  }

}
