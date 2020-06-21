import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeProjetComponent } from './resume-projet.component';

describe('ResumeProjetComponent', () => {
  let component: ResumeProjetComponent;
  let fixture: ComponentFixture<ResumeProjetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumeProjetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
