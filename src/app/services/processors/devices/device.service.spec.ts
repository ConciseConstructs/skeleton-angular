import { TestBed } from '@angular/core/testing';

import { DevicesProcessingService } from './devices-processing.service';

describe('DeviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  xit('should be created', () => {
    const service: DevicesProcessingService = TestBed.get(DevicesProcessingService);
    expect(service).toBeTruthy();
  });
});
