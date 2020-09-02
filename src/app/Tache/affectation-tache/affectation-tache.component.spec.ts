import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectationTacheComponent } from './affectation-tache.component';

describe('AffectationTacheComponent', () => {
  let component: AffectationTacheComponent;
  let fixture: ComponentFixture<AffectationTacheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffectationTacheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffectationTacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
