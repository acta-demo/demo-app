import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalStringPickerComponent } from './modal-string-picker.component';

describe('ModalStringPickerComponent', () => {
  let component: ModalStringPickerComponent;
  let fixture: ComponentFixture<ModalStringPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalStringPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalStringPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
