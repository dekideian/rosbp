import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatiAdaugareComponent } from './candidati-adaugare.component';

describe('CandidatiAdaugareComponent', () => {
  let component: CandidatiAdaugareComponent;
  let fixture: ComponentFixture<CandidatiAdaugareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidatiAdaugareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatiAdaugareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
