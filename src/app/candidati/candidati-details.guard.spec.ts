import { TestBed } from '@angular/core/testing';

import { CandidatiDetailsGuard } from './candidati-details.guard';

describe('CandidatiDetailsGuard', () => {
  let guard: CandidatiDetailsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CandidatiDetailsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
