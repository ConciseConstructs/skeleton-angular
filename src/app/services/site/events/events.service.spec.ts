import { TestBed } from '@angular/core/testing';

import { EventsService } from './events.service';

describe('EventsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  xit('should be created', () => {
    const service: EventsService = TestBed.get(EventsService);
    expect(service).toBeTruthy();
  });
});
