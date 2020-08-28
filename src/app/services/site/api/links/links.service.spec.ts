import { TestBed } from '@angular/core/testing';

import { LinksApiService } from './links.service';

describe('LinksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  xit('should be created', () => {
    const service: LinksApiService = TestBed.get(LinksApiService);
    expect(service).toBeTruthy();
  });
});
