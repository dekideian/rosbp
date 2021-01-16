import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilizatoriListComponent } from './utilizatori-list.component';

describe('UtilizatoriListComponent', () => {
  let component: UtilizatoriListComponent;
  let fixture: ComponentFixture<UtilizatoriListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilizatoriListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilizatoriListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
