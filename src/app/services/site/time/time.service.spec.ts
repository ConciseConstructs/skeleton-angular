import { TestBed } from '@angular/core/testing';

import { TimeService } from './time.service';

describe('TimeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  xit('should be created', () => {
    const service: TimeService = TestBed.get(TimeService);
    expect(service).toBeTruthy();
  });
});
