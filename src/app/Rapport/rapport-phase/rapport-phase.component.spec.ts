import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RapportPhaseComponent } from './rapport-phase.component';

describe('RapportPhaseComponent', () => {
  let component: RapportPhaseComponent;
  let fixture: ComponentFixture<RapportPhaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RapportPhaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RapportPhaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
