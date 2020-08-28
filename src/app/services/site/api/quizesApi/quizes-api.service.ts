import { Injectable } from '@angular/core';
import { DataModelApiService } from 'src/assets/classes/DataModelApiService.class';
import { HttpClient } from '@angular/common/http';
import { environment as saas } from '../../../../../environments/environment'
import { Quiz } from 'src/assets/models/Quiz.model';


@Injectable({
  providedIn: 'root'
})
export class QuizesApiService extends DataModelApiService {


  constructor(
    protected http:HttpClient
  ) {
    super(http)
  }












  protected hookConstructorPre() {
    this.endpoint = saas.endpoints.quizes
    this.Model = Quiz
  }

}
