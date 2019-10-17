import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyListsComponent } from './policy-lists.component';

describe('PolicyListsComponent', () => {
  let component: PolicyListsComponent;
  let fixture: ComponentFixture<PolicyListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicyListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
