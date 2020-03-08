import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnadirFenomenoParanormalComponent } from './anadir-fenomeno-paranormal.component';

describe('AnadirFenomenoParanormalComponent', () => {
  let component: AnadirFenomenoParanormalComponent;
  let fixture: ComponentFixture<AnadirFenomenoParanormalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnadirFenomenoParanormalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnadirFenomenoParanormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
