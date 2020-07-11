import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilisateurGanttComponent } from './utilisateur-gantt.component';

describe('UtilisateurGanttComponent', () => {
  let component: UtilisateurGanttComponent;
  let fixture: ComponentFixture<UtilisateurGanttComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilisateurGanttComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilisateurGanttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
