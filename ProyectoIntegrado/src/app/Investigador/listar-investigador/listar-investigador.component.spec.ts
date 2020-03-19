import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarInvestigadorComponent } from './listar-investigador.component';

describe('ListarInvestigadorComponent', () => {
  let component: ListarInvestigadorComponent;
  let fixture: ComponentFixture<ListarInvestigadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarInvestigadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarInvestigadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
