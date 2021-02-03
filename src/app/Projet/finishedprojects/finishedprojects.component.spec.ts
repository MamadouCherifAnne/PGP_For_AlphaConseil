import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishedprojectsComponent } from './finishedprojects.component';

describe('FinishedprojectsComponent', () => {
  let component: FinishedprojectsComponent;
  let fixture: ComponentFixture<FinishedprojectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinishedprojectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishedprojectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
