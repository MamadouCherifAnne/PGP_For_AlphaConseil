import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembreProjetComponent } from './membre-projet.component';

describe('MembreProjetComponent', () => {
  let component: MembreProjetComponent;
  let fixture: ComponentFixture<MembreProjetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembreProjetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembreProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
