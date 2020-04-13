import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarDatosLoginComponent } from './modificar-datos-login.component';

describe('ModificarDatosLoginComponent', () => {
  let component: ModificarDatosLoginComponent;
  let fixture: ComponentFixture<ModificarDatosLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarDatosLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarDatosLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
