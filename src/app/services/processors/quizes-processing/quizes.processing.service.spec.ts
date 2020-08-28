import { TestBed } from '@angular/core/testing';

import { QuizesProcessingService } from './quizes.processing.service';

describe('QuizesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  xit('should be created', () => {
    const service: QuizesProcessingService = TestBed.get(QuizesProcessingService);
    expect(service).toBeTruthy();
  });
});
