import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilizatoriDetaliiComponent } from './utilizatori-detalii.component';

describe('UtilizatoriDetaliiComponent', () => {
  let component: UtilizatoriDetaliiComponent;
  let fixture: ComponentFixture<UtilizatoriDetaliiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilizatoriDetaliiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilizatoriDetaliiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
