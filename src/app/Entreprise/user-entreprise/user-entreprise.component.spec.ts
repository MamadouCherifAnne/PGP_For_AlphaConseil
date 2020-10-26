import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEntrepriseComponent } from './user-entreprise.component';

describe('UserEntrepriseComponent', () => {
  let component: UserEntrepriseComponent;
  let fixture: ComponentFixture<UserEntrepriseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserEntrepriseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
