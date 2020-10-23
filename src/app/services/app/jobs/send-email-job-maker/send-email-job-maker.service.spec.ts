import { TestBed } from '@angular/core/testing';

import { SendEmailJobMakerService } from './send-email-job-maker.service';

describe('SendEmailJobMakerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SendEmailJobMakerService = TestBed.get(SendEmailJobMakerService);
    expect(service).toBeTruthy();
  });
});
