import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatiDetaliiComponent } from './candidati-detalii.component';

describe('CandidatiDetaliiComponent', () => {
  let component: CandidatiDetaliiComponent;
  let fixture: ComponentFixture<CandidatiDetaliiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidatiDetaliiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatiDetaliiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
