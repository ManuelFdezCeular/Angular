import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormVisitsComponent } from './form-visits.component';

describe('FormVisitsComponent', () => {
  let component: FormVisitsComponent;
  let fixture: ComponentFixture<FormVisitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormVisitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormVisitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
