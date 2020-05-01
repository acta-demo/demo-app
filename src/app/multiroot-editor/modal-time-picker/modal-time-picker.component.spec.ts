import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTimePickerComponent } from './modal-time-picker.component';

describe('ModalTimePickerComponent', () => {
    let component: ModalTimePickerComponent;
    let fixture: ComponentFixture<ModalTimePickerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ModalTimePickerComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ModalTimePickerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
