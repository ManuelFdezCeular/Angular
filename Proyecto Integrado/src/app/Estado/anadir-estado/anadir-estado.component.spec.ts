import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnadirEstadoComponent } from './anadir-estado.component';

describe('AnadirEstadoComponent', () => {
  let component: AnadirEstadoComponent;
  let fixture: ComponentFixture<AnadirEstadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnadirEstadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnadirEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
