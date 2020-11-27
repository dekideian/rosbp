import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatiListComponent } from './candidati-list.component';

describe('CandidatiListComponent', () => {
  let component: CandidatiListComponent;
  let fixture: ComponentFixture<CandidatiListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidatiListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
