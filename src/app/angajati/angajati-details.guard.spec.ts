import { TestBed } from '@angular/core/testing';

import { AngajatiDetailsGuard } from './angajati-details.guard';

describe('AngajatiDetailsGuard', () => {
  let guard: AngajatiDetailsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AngajatiDetailsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
