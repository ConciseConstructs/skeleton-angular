import { TestBed } from '@angular/core/testing';

import { RegistrationService } from './registration.service';

describe('SignupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  xit('should be created', () => {
    const service: RegistrationService = TestBed.get(RegistrationService);
    expect(service).toBeTruthy();
  });
});
