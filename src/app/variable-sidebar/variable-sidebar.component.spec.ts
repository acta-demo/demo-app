import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VariableSidebarComponent } from './variable-sidebar.component';

describe('VariableSidebarComponent', () => {
    let component: VariableSidebarComponent;
    let fixture: ComponentFixture<VariableSidebarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [VariableSidebarComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(VariableSidebarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
