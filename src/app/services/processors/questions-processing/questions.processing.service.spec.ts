import { TestBed } from '@angular/core/testing';

import { QuestionsProcessingService } from './questions.processing.service';

describe('QuestionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  xit('should be created', () => {
    const service: QuestionsProcessingService = TestBed.get(QuestionsProcessingService);
    expect(service).toBeTruthy();
  });
});
