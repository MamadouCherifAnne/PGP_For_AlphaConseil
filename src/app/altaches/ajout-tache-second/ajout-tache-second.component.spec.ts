import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutTacheSecondComponent } from './ajout-tache-second.component';

describe('AjoutTacheSecondComponent', () => {
  let component: AjoutTacheSecondComponent;
  let fixture: ComponentFixture<AjoutTacheSecondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutTacheSecondComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutTacheSecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
