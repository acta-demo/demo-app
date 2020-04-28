import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDatePickerComponent } from './modal-date-picker.component';

describe('ModalDatePickerComponent', () => {
  let component: ModalDatePickerComponent;
  let fixture: ComponentFixture<ModalDatePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDatePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
