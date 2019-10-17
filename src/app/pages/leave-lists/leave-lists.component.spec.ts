import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveListsComponent } from './leave-lists.component';

describe('LeaveListsComponent', () => {
  let component: LeaveListsComponent;
  let fixture: ComponentFixture<LeaveListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
