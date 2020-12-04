import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondTableauDeBordComponent } from './second-tableau-de-bord.component';

describe('SecondTableauDeBordComponent', () => {
  let component: SecondTableauDeBordComponent;
  let fixture: ComponentFixture<SecondTableauDeBordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondTableauDeBordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondTableauDeBordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
