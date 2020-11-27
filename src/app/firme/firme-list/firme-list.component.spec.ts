import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmeListComponent } from './firme-list.component';

describe('FirmeListComponent', () => {
  let component: FirmeListComponent;
  let fixture: ComponentFixture<FirmeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirmeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
