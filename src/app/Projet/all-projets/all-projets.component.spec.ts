import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProjetsComponent } from './all-projets.component';

describe('AllProjetsComponent', () => {
  let component: AllProjetsComponent;
  let fixture: ComponentFixture<AllProjetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllProjetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllProjetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
