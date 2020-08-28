import { Injectable } from '@angular/core';
import { DataModelProcessingService } from 'src/assets/classes/DataModelProcessingService.class';
import { EventsService } from '../../site/events/events.service';
import { ApiService } from '../../site/api/api.service';
import { OfflineService } from '../../site/offline/offline.service';
import { Tag } from '../../../../assets/models/Tag.model'


@Injectable({
  providedIn: 'root'
})
export class TagsProcessingService extends DataModelProcessingService {


  constructor(
    protected events:EventsService,
    protected api:ApiService,
    protected offline:OfflineService,
  ) {
    super()
  }












  protected hookConstructorPre() {
    this.modelName = 'tags'
    this.Model = Tag
    this.onNewDataEmitterName = 'onNewTags'
  }

}
