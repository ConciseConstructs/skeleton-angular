import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public braintreeId?:string
  public acctId?:string

  constructor() {
    this.init()
  }




      private init() {
        Object.entries(localStorage).forEach(keyValue => this.gatherStoredKeyValue(keyValue))
      }




          private gatherStoredKeyValue(keyValue) {
            this[keyValue[0]] = JSON.parse(keyValue[1])
          }












  public get(keyName:string) {
    let data = localStorage.getItem(keyName)
    let parsedData = JSON.parse(data)
    this[keyName] = parsedData
    return parsedData
  }












  public set(params:{ key:string, value:any }) {
    localStorage.setItem(params.key, params.value)
    this[params.key] = params.value
  }

}
