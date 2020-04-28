import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalListOfSpeakersComponent } from './modal-list-of-speakers.component';

describe('ModalListOfSpeakersComponent', () => {
  let component: ModalListOfSpeakersComponent;
  let fixture: ComponentFixture<ModalListOfSpeakersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalListOfSpeakersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalListOfSpeakersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
