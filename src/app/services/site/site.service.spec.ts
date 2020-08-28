import { TestBed } from '@angular/core/testing';

import { SiteService } from './site.service';

describe('SiteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  xit('should be created', () => {
    const service: SiteService = TestBed.get(SiteService);
    expect(service).toBeTruthy();
  });
});
