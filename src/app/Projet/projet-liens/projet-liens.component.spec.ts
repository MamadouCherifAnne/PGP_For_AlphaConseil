import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetLiensComponent } from './projet-liens.component';

describe('ProjetLiensComponent', () => {
  let component: ProjetLiensComponent;
  let fixture: ComponentFixture<ProjetLiensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjetLiensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjetLiensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
