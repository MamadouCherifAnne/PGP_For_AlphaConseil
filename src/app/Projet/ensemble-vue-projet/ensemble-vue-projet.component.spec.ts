import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnsembleVueProjetComponent } from './ensemble-vue-projet.component';

describe('EnsembleVueProjetComponent', () => {
  let component: EnsembleVueProjetComponent;
  let fixture: ComponentFixture<EnsembleVueProjetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnsembleVueProjetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnsembleVueProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
