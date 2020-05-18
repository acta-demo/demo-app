import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalShowDiffComponent } from './modal-show-diff.component';

describe('ModalShowDiffComponent', () => {
    let component: ModalShowDiffComponent;
    let fixture: ComponentFixture<ModalShowDiffComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ModalShowDiffComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ModalShowDiffComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
