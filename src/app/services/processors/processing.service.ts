import { Injectable } from '@angular/core';
import { DevicesProcessingService } from './devices/devices-processing.service';


@Injectable({
  providedIn: 'root'
})
export class ProcessingService {

  constructor(
    public devices:DevicesProcessingService
  ) { }
}
