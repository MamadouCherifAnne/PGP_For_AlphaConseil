import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeProfessionComponent } from './liste-profession.component';

describe('ListeProfessionComponent', () => {
  let component: ListeProfessionComponent;
  let fixture: ComponentFixture<ListeProfessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeProfessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeProfessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
