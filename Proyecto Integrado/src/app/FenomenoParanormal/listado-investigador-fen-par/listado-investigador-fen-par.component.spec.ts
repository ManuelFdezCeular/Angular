import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoInvestigadorFenParComponent } from './listado-investigador-fen-par.component';

describe('ListadoInvestigadorFenParComponent', () => {
  let component: ListadoInvestigadorFenParComponent;
  let fixture: ComponentFixture<ListadoInvestigadorFenParComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoInvestigadorFenParComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoInvestigadorFenParComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
