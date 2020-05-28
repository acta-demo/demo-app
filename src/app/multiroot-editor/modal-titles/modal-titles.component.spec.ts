import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTitlesComponent } from './modal-titles.component';

describe('ModalTitlesComponent', () => {
    let component: ModalTitlesComponent;
    let fixture: ComponentFixture<ModalTitlesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ModalTitlesComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ModalTitlesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
