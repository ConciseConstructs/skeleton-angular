import { Injectable } from '@angular/core';
import { DataModelApiService } from 'src/assets/classes/DataModelApiService.class';
import { HttpClient } from '@angular/common/http';
import { environment as saas } from '../../../../../environments/environment'
import { Question } from 'src/assets/models/Question.model';


@Injectable({
  providedIn: 'root'
})
export class QuestionsApiService extends DataModelApiService {


  constructor(
    protected http:HttpClient
  ) {
    super(http)
  }












  protected hookConstructorPre() {
    this.endpoint = saas.endpoints.questions
    this.Model = Question
  }

}
