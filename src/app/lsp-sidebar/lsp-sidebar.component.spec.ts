import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LspSidebarComponent } from './lsp-sidebar.component';

describe('LspSidebarComponent', () => {
    let component: LspSidebarComponent;
    let fixture: ComponentFixture<LspSidebarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LspSidebarComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LspSidebarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
