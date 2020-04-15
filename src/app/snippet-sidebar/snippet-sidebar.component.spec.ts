import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnippetSidebarComponent } from './snippet-sidebar.component';

describe('SnippetSidebarComponent', () => {
  let component: SnippetSidebarComponent;
  let fixture: ComponentFixture<SnippetSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnippetSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnippetSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
