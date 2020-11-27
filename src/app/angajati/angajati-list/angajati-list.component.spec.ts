import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngajatiListComponent } from './angajati-list.component';

describe('AngajatiListComponent', () => {
  let component: AngajatiListComponent;
  let fixture: ComponentFixture<AngajatiListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngajatiListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngajatiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
