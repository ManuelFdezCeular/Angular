import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarEstadoComponent } from './modificar-estado.component';

describe('ModificarEstadoComponent', () => {
  let component: ModificarEstadoComponent;
  let fixture: ComponentFixture<ModificarEstadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarEstadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
