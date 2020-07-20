import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltachesComponent } from './altaches.component';

describe('AltachesComponent', () => {
  let component: AltachesComponent;
  let fixture: ComponentFixture<AltachesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltachesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltachesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
