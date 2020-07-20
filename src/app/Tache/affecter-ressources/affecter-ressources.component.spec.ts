import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffecterRessourcesComponent } from './affecter-ressources.component';

describe('AffecterRessourcesComponent', () => {
  let component: AffecterRessourcesComponent;
  let fixture: ComponentFixture<AffecterRessourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffecterRessourcesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffecterRessourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
