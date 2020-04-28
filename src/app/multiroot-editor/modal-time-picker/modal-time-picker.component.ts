import { Component, OnInit, Input } from '@angular/core';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-time-picker',
  templateUrl: './modal-time-picker.component.html',
  styleUrls: ['./modal-time-picker.component.css']
})
export class ModalTimePickerComponent implements OnInit {

  timeSelected = { hour: 0, minute: 0 };
  faWindowClose = faWindowClose;

  @Input() fromParent;

  constructor( public activeModal: NgbActiveModal ) { }

  ngOnInit() {
    console.log(this.fromParent);
    const value = this.fromParent;
    if(value !== 'UNRESOLVED') {
      const spl = value.replace(/['"]+/g, '').split(':');
      console.log('spl:', spl);
      this.timeSelected.hour = parseInt(spl[0]);
      this.timeSelected.minute = parseInt(spl[1]);
      console.log('this.timeSelected:', this.timeSelected);
    }
  }

  closeModal(sendStatus) {
    console.log('#### timeSelected:', this.timeSelected);
    const sendDataToEditor = (sendStatus === 'save') ? this.timeSelected : undefined;
    this.activeModal.close(sendDataToEditor);
  }

}
