import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyUsersCreateComponent } from './company-users-create.component';

describe('CompanyUsersCreateComponent', () => {
  let component: CompanyUsersCreateComponent;
  let fixture: ComponentFixture<CompanyUsersCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyUsersCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyUsersCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
