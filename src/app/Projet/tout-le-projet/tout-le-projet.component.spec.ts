import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToutLeProjetComponent } from './tout-le-projet.component';

describe('ToutLeProjetComponent', () => {
  let component: ToutLeProjetComponent;
  let fixture: ComponentFixture<ToutLeProjetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToutLeProjetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToutLeProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
