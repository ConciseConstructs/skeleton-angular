import { Injectable } from '@angular/core';
import { DataModelProcessingService } from 'src/assets/classes/DataModelProcessingService.class';
import { EventsService } from '../../site/events/events.service';
import { ApiService } from '../../site/api/api.service';
import { OfflineService } from '../../site/offline/offline.service';
import { Question } from 'src/assets/models/Question.model';


@Injectable({
  providedIn: 'root'
})
export class QuestionsProcessingService extends DataModelProcessingService {


  constructor(
    protected events:EventsService,
    protected api:ApiService,
    protected offline:OfflineService,
  ) {
    super()
  }












  protected hookConstructorPre() {
    this.modelName = 'questions'
    this.Model = Question
    this.onNewDataEmitterName = 'onNewQuestions'
  }

}
