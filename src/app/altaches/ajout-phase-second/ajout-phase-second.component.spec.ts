import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutPhaseSecondComponent } from './ajout-phase-second.component';

describe('AjoutPhaseSecondComponent', () => {
  let component: AjoutPhaseSecondComponent;
  let fixture: ComponentFixture<AjoutPhaseSecondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutPhaseSecondComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutPhaseSecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
