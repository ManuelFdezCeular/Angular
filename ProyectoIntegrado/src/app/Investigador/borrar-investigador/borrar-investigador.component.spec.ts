import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarInvestigadorComponent } from './borrar-investigador.component';

describe('BorrarInvestigadorComponent', () => {
  let component: BorrarInvestigadorComponent;
  let fixture: ComponentFixture<BorrarInvestigadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrarInvestigadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrarInvestigadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
