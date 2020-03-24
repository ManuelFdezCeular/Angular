import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarArchivoComponent } from './listar-archivo.component';

describe('ListarArchivoComponent', () => {
  let component: ListarArchivoComponent;
  let fixture: ComponentFixture<ListarArchivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarArchivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarArchivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
