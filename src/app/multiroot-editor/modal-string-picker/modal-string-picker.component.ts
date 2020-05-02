import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-modal-string-picker',
    templateUrl: './modal-string-picker.component.html',
    styleUrls: ['./modal-string-picker.component.css'],
})
export class ModalStringPickerComponent implements OnInit {
    @Input() fromParent;
    strSelected: string | null = null;
    faWindowClose = faWindowClose;

    constructor(public activeModal: NgbActiveModal) {}

    ngOnInit() {
        console.log(this.fromParent);
        const value = this.fromParent;
        if (value === 'UNRESOLVED') {
            this.strSelected = '';
        } else {
            const spl = value.split('/');
            console.log('spl:', spl);
            this.strSelected = value;
            console.log('this.strSelected:', this.strSelected);
        }
    }

    closeModal(sendStatus) {
        console.log('#### strSelected:', this.strSelected);
        if (sendStatus === 'save' && this.strSelected.trim() === '') {
            this.strSelected = 'UNRESOLVED';
        }
        const sendDataToEditor = sendStatus === 'save' ? this.strSelected : undefined;
        this.activeModal.close(sendDataToEditor);
    }
}
