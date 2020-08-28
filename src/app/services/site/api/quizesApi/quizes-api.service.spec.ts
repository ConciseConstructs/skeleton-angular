import { TestBed } from '@angular/core/testing';

import { QuizesApiService } from './quizes-api.service';

describe('QuizesApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  xit('should be created', () => {
    const service: QuizesApiService = TestBed.get(QuizesApiService);
    expect(service).toBeTruthy();
  });
});
