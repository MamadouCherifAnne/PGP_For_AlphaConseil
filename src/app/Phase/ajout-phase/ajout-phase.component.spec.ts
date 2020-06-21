import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutPhaseComponent } from './ajout-phase.component';

describe('AjoutPhaseComponent', () => {
  let component: AjoutPhaseComponent;
  let fixture: ComponentFixture<AjoutPhaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutPhaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutPhaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
