import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-modal-date-picker',
    templateUrl: './modal-date-picker.component.html',
    styleUrls: ['./modal-date-picker.component.css'],
})
export class ModalDatePickerComponent implements OnInit {
    @Input() fromParent: any;

    dateSelected: NgbDate | null = null;
    faWindowClose = faWindowClose;

    constructor(public activeModal: NgbActiveModal, private calendar: NgbCalendar) {}

    ngOnInit() {
        console.log(this.fromParent);
        const value = this.fromParent;
        if (value === 'UNRESOLVED') {
            this.dateSelected = this.calendar.getToday();
        } else {
            const spl = value.split('/');
            console.log('spl:', spl);
            this.dateSelected = NgbDate.from({
                year: parseInt(spl[0]),
                month: parseInt(spl[1]),
                day: parseInt(spl[2]),
            });
            console.log('this.dateSelected:', this.dateSelected);
        }
    }

    closeModal(sendStatus) {
        console.log('#### dateSelected:', this.dateSelected);
        const sendDataToEditor = sendStatus === 'save' ? this.dateSelected : undefined;
        this.activeModal.close(sendDataToEditor);
    }
}
