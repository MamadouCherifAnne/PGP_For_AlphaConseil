import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LateprojetsComponent } from './lateprojets.component';

describe('LateprojetsComponent', () => {
  let component: LateprojetsComponent;
  let fixture: ComponentFixture<LateprojetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LateprojetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LateprojetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
