import { TestBed } from '@angular/core/testing';

import { AlfaconseilinterceptorService } from './alfaconseilinterceptor.service';

describe('AlfaconseilinterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlfaconseilinterceptorService = TestBed.get(AlfaconseilinterceptorService);
    expect(service).toBeTruthy();
  });
});
