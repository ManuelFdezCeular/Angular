import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarFenomenoParanormalComponent } from './modificar-fenomeno-paranormal.component';

describe('ModificarFenomenoParanormalComponent', () => {
  let component: ModificarFenomenoParanormalComponent;
  let fixture: ComponentFixture<ModificarFenomenoParanormalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarFenomenoParanormalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarFenomenoParanormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
