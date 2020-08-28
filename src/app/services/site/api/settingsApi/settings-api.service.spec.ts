import { TestBed } from '@angular/core/testing';

import { SettingsApiService } from './settings-api.service';

describe('SettingsApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  xit('should be created', () => {
    const service: SettingsApiService = TestBed.get(SettingsApiService);
    expect(service).toBeTruthy();
  });
});
