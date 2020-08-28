import { TestBed } from '@angular/core/testing';

import { TagsProcessingService } from './tags.processing.service';

describe('TagsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  xit('should be created', () => {
    const service: TagsProcessingService = TestBed.get(TagsProcessingService);
    expect(service).toBeTruthy();
  });
});
