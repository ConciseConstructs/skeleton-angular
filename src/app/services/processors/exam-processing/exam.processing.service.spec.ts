import { TestBed } from '@angular/core/testing';

import { ExamProcessingService } from './exam.processing.service';

describe('ExamService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  xit('should be created', () => {
    const service: ExamProcessingService = TestBed.get(ExamProcessingService);
    expect(service).toBeTruthy();
  });
});
