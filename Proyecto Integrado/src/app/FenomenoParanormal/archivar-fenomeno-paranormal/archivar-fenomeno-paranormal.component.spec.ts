import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivarFenomenoParanormalComponent } from './archivar-fenomeno-paranormal.component';

describe('ArchivarFenomenoParanormalComponent', () => {
  let component: ArchivarFenomenoParanormalComponent;
  let fixture: ComponentFixture<ArchivarFenomenoParanormalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchivarFenomenoParanormalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivarFenomenoParanormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
