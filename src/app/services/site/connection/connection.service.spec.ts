import { TestBed } from '@angular/core/testing';

import { ConnectionService } from './connection.service';

describe('ConnectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  xit('should be created', () => {
    const service: ConnectionService = TestBed.get(ConnectionService);
    expect(service).toBeTruthy();
  });
});
