import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJalonComponent } from './add-jalon.component';

describe('AddJalonComponent', () => {
  let component: AddJalonComponent;
  let fixture: ComponentFixture<AddJalonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddJalonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddJalonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
