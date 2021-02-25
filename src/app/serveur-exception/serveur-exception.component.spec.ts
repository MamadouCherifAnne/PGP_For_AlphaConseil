import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServeurExceptionComponent } from './serveur-exception.component';

describe('ServeurExceptionComponent', () => {
  let component: ServeurExceptionComponent;
  let fixture: ComponentFixture<ServeurExceptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServeurExceptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServeurExceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
