import { TestBed } from '@angular/core/testing';

import { FirmeDetailsGuard } from './firme-details.guard';

describe('FirmeDetailsGuard', () => {
  let guard: FirmeDetailsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FirmeDetailsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
