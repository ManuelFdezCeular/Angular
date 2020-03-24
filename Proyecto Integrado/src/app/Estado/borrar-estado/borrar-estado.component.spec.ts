import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarEstadoComponent } from './borrar-estado.component';

describe('BorrarEstadoComponent', () => {
  let component: BorrarEstadoComponent;
  let fixture: ComponentFixture<BorrarEstadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrarEstadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrarEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
