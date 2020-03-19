import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarInvestigadorComponent } from './modificar-investigador.component';

describe('ModificarInvestigadorComponent', () => {
  let component: ModificarInvestigadorComponent;
  let fixture: ComponentFixture<ModificarInvestigadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarInvestigadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarInvestigadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
