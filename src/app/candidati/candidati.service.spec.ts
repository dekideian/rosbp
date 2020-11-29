import { TestBed } from '@angular/core/testing';

import { CandidatiService } from './candidati.service';

describe('CandidatiService', () => {
  let service: CandidatiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CandidatiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
