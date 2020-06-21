import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProfessionComponent } from './update-profession.component';

describe('UpdateProfessionComponent', () => {
  let component: UpdateProfessionComponent;
  let fixture: ComponentFixture<UpdateProfessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateProfessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProfessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
