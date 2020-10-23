import { Injectable } from '@angular/core';
import { StandardReturn } from 'src/assets/types/StandardReturn.type';
import { ConnectionService } from '../app/connection/connection.service';
import { environment as saas } from '../../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private mockOffline:boolean


  constructor(
    private connection:ConnectionService,
  ) {
    this.mockOffline = saas.mockOffline
    if (this.mockOffline) this.createFakeDEVApiStructure()
    if (this.mockOffline) this.connection.online = false
  }




      private createFakeDEVApiStructure() {
        // this.tags = this.fakeDEVApiObject() as any
      }




          private fakeDEVApiObject() {
            return {
              getRecords: ():Promise<StandardReturn> =>  {
                return new Promise((resolve, reject)=> {
                  if (this.mockOffline) reject({ success: false, details: null })
                  else resolve({ success: true, details: [ ] })
                })
              },
              save: (params:any):Promise<StandardReturn> => {
                return new Promise((resolve, reject)=> {
                  if (this.mockOffline) reject({ success: false, details: params })
                  else resolve({ success: true, details: params})
                })
              },
              update: (params:any):Promise<StandardReturn> => {
                return new Promise((resolve, reject)=> {
                  if (this.mockOffline) reject({ success: false, details: params })
                  else resolve({ success: true, details: params })
                })
              },
              remove: (id:string):Promise<StandardReturn> => {
                return new Promise((resolve, reject)=> {
                  if (this.mockOffline) reject({ success: false, details: id })
                  else resolve({ success: true })
                })
              }
            }
          }

}
