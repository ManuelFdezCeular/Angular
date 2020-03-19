import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnadirInvestigadorComponent } from './anadir-investigador.component';

describe('AnadirInvestigadorComponent', () => {
  let component: AnadirInvestigadorComponent;
  let fixture: ComponentFixture<AnadirInvestigadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnadirInvestigadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnadirInvestigadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
