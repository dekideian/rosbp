import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngajatiDetaliiComponent } from './angajati-detalii.component';

describe('AngajatiDetaliiComponent', () => {
  let component: AngajatiDetaliiComponent;
  let fixture: ComponentFixture<AngajatiDetaliiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngajatiDetaliiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngajatiDetaliiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
