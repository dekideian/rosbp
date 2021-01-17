import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilizatoriAdaugareComponent } from './utilizatori-adaugare.component';

describe('UtilizatoriAdaugareComponent', () => {
  let component: UtilizatoriAdaugareComponent;
  let fixture: ComponentFixture<UtilizatoriAdaugareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilizatoriAdaugareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilizatoriAdaugareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
