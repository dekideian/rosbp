import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngajatiAdaugareComponent } from './angajati-adaugare.component';

describe('AngajatiAdaugareComponent', () => {
  let component: AngajatiAdaugareComponent;
  let fixture: ComponentFixture<AngajatiAdaugareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngajatiAdaugareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngajatiAdaugareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
