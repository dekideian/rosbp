import { TestBed } from '@angular/core/testing';

import { UtilizatoriDetailsGuard } from './utilizatori-details.guard';

describe('UtilizatoriDetailsGuard', () => {
  let guard: UtilizatoriDetailsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UtilizatoriDetailsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
