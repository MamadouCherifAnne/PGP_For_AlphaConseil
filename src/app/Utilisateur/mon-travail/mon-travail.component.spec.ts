import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonTravailComponent } from './mon-travail.component';

describe('MonTravailComponent', () => {
  let component: MonTravailComponent;
  let fixture: ComponentFixture<MonTravailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonTravailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonTravailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
