import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileComentComponent } from './file-coment.component';

describe('FileComentComponent', () => {
  let component: FileComentComponent;
  let fixture: ComponentFixture<FileComentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileComentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileComentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
