import { TestBed, async, inject } from '@angular/core/testing';

import { SessionGuard } from './session.guard';

describe('SessionGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SessionGuard]
    });
  });

  xit('should ...', inject([SessionGuard], (guard: SessionGuard) => {
    expect(guard).toBeTruthy();
  }));
});
