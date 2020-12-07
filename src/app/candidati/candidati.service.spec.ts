import { TestBed } from '@angular/core/testing';

import { SalariatiService } from './candidati.service';

describe('CandidatiService', () => {
  let service: SalariatiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalariatiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
