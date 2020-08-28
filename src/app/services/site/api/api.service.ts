import { Injectable } from '@angular/core';
import { StandardReturn } from 'src/assets/types/StandardReturn.type';
import { TagsApiService } from './tagsApi/tags-api.service';
import { QuestionsApiService } from './questionsApi/questions-api.service';
import { QuizesApiService } from './quizesApi/quizes-api.service';
import { SettingsApiService } from './settingsApi/settings-api.service';
import { DevicesApiService } from './devicesApi/devices-api.service'
// import { LinksApiService } from './links/links.service'
import { ConnectionService } from '../connection/connection.service';
import { environment as saas } from '../../../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private mockOffline:boolean


  constructor(
    public tags:TagsApiService,
    public questions:QuestionsApiService,
    public quizes:QuizesApiService,
    public settings:SettingsApiService,
    public devices:DevicesApiService,
    // public links:LinksApiService,
    private connection:ConnectionService,
  ) {
    this.mockOffline = saas.mockOffline
    if (this.mockOffline) this.createFakeDEVApiStructure()
    if (this.mockOffline) this.connection.online = false
  }




      private createFakeDEVApiStructure() {
        this.tags = this.fakeDEVApiObject() as any
        this.questions = this.fakeDEVApiObject() as any
        this.quizes = this.fakeDEVApiObject() as any
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
