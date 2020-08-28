import { TestBed } from '@angular/core/testing';

import { SettingsProcessingService } from './settings-processing.service';

describe('SettingsProcessingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  xit('should be created', () => {
    const service: SettingsProcessingService = TestBed.get(SettingsProcessingService);
    expect(service).toBeTruthy();
  });
});
