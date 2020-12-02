import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmeAdaugareComponent } from './firme-adaugare.component';

describe('FirmeAdaugareComponent', () => {
  let component: FirmeAdaugareComponent;
  let fixture: ComponentFixture<FirmeAdaugareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirmeAdaugareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmeAdaugareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
