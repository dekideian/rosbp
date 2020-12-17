import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatiEditareComponent } from './candidati-editare.component';

describe('CandidatiEditareComponent', () => {
  let component: CandidatiEditareComponent;
  let fixture: ComponentFixture<CandidatiEditareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidatiEditareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatiEditareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
