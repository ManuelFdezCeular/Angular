import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescripcionInvestigadorComponent } from './descripcion-investigador.component';

describe('DescripcionInvestigadorComponent', () => {
  let component: DescripcionInvestigadorComponent;
  let fixture: ComponentFixture<DescripcionInvestigadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescripcionInvestigadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescripcionInvestigadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
