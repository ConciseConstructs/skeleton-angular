import { TestBed } from '@angular/core/testing';

import { LayersService } from './layers.service';

describe('LayersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  xit('should be created', () => {
    const service: LayersService = TestBed.get(LayersService);
    expect(service).toBeTruthy();
  });
});
