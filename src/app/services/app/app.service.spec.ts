import { TestBed } from '@angular/core/testing';

import { AppService } from './app.service';

describe('SiteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  xit('should be created', () => {
    const service: AppService = TestBed.get(AppService);
    expect(service).toBeTruthy();
  });
});
