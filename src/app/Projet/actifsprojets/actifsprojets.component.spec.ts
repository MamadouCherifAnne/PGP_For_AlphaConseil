import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActifsprojetsComponent } from './actifsprojets.component';

describe('ActifsprojetsComponent', () => {
  let component: ActifsprojetsComponent;
  let fixture: ComponentFixture<ActifsprojetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActifsprojetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActifsprojetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
