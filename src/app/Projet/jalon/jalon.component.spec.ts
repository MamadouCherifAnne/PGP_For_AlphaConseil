import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JalonComponent } from './jalon.component';

describe('JalonComponent', () => {
  let component: JalonComponent;
  let fixture: ComponentFixture<JalonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JalonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JalonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
