import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmeEditareComponent } from './firme-editare.component';

describe('FirmeEditareComponent', () => {
  let component: FirmeEditareComponent;
  let fixture: ComponentFixture<FirmeEditareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirmeEditareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmeEditareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
