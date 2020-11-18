import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TauxAvancemantComponent } from './taux-avancemant.component';

describe('TauxAvancemantComponent', () => {
  let component: TauxAvancemantComponent;
  let fixture: ComponentFixture<TauxAvancemantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TauxAvancemantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TauxAvancemantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
