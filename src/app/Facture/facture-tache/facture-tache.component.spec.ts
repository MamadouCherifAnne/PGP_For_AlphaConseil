import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactureTacheComponent } from './facture-tache.component';

describe('FactureTacheComponent', () => {
  let component: FactureTacheComponent;
  let fixture: ComponentFixture<FactureTacheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactureTacheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactureTacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
