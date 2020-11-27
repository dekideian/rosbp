import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmeDetaliiComponent } from './firme-detalii.component';

describe('FirmeDetaliiComponent', () => {
  let component: FirmeDetaliiComponent;
  let fixture: ComponentFixture<FirmeDetaliiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirmeDetaliiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmeDetaliiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
