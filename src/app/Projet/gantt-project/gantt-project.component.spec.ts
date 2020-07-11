import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GanttProjectComponent } from './gantt-project.component';

describe('GanttProjectComponent', () => {
  let component: GanttProjectComponent;
  let fixture: ComponentFixture<GanttProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GanttProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GanttProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
