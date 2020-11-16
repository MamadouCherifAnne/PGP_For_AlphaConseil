import { TestBed } from '@angular/core/testing';

import { RapportServiceService } from './rapport-service.service';

describe('RapportServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RapportServiceService = TestBed.get(RapportServiceService);
    expect(service).toBeTruthy();
  });
});
