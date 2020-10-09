import { TestBed } from '@angular/core/testing';

import { ScheduleProcessingService } from './schedule-processing.service';

describe('ScheduleProcessingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  xit('should be created', () => {
    const service: ScheduleProcessingService = TestBed.get(ScheduleProcessingService);
    expect(service).toBeTruthy();
  });
});
