import { TestBed } from '@angular/core/testing';

import { JobService } from './schedule.service';

describe('ScheduleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  xit('should be created', () => {
    const service: JobService = TestBed.get(JobService);
    expect(service).toBeTruthy();
  });
});
