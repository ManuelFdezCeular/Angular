import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoFenomenosParanormalesComponent } from './listado-fenomenos-paranormales.component';

describe('ListadoFenomenosParanormalesComponent', () => {
  let component: ListadoFenomenosParanormalesComponent;
  let fixture: ComponentFixture<ListadoFenomenosParanormalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoFenomenosParanormalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoFenomenosParanormalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
