import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarFenomenoParanormalComponent } from './borrar-fenomeno-paranormal.component';

describe('BorrarFenomenoParanormalComponent', () => {
  let component: BorrarFenomenoParanormalComponent;
  let fixture: ComponentFixture<BorrarFenomenoParanormalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrarFenomenoParanormalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrarFenomenoParanormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
