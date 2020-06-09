import { Component, Input, Renderer2, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import TITLES from './titles';

interface Title {
    id: number;
    no: string;
    body: string;
    docRef: string;
    reporter: string;
    title: string;
}

export interface TitleToEditor {
    titleId: number;
    isOverridden: boolean;
    templateId: number;
    textValue: string;
}

@Component({
    selector: 'app-modal-titles',
    templateUrl: './modal-titles.component.html',
    styleUrls: ['./modal-titles.component.css'],
})
export class ModalTitlesComponent implements AfterViewInit {
    @ViewChild('resultstring', { static: false }) resultstringE: ElementRef;
    @Input() fromParent: TitleToEditor;
    //availableTitles: Title[] = [...TITLES];
    availableTitles: Title[] = TITLES.slice();
    selectedTitleText = '';
    isOverridden = false;
    titleToEditor: TitleToEditor = {
        titleId: 0,
        isOverridden: false,
        templateId: 1,
        textValue: '',
    };
    faWindowClose = faWindowClose;
    selectedTemplate: string;
    templateOptions = [
        { id: 1, text: 'Main title (short title)' },
        { id: 2, text: 'Short title (procedure)' },
    ];

    constructor(public activeModal: NgbActiveModal, private _renderer: Renderer2) {}

    ngAfterViewInit() {
        if (this.fromParent) {
            console.log('#### this.fromParent:', this.fromParent);
            const dataFromEditor: TitleToEditor = this.fromParent;

            setTimeout(() => {
                this.titleToEditor.titleId = dataFromEditor.titleId;
                this.titleToEditor.isOverridden = dataFromEditor.isOverridden;
                this.titleToEditor.templateId = dataFromEditor.templateId;
                this.titleToEditor.textValue = dataFromEditor.textValue;
                this.selectedTitleText = dataFromEditor.textValue;
                this.resultstringE.nativeElement.innerHTML = dataFromEditor.textValue;
            });
            // this.availableLsp = this.availableLsp.filter(value => !dataFromEditor.listOfSpeakers.includes(value));
        } else {
        }
    }

    closeModal(sendStatus) {
        // console.log('#### dateSelected:', this.dateSelected);
        const sendDataToEditor = sendStatus === 'save' ? this.titleToEditor : undefined;
        this.activeModal.close(sendDataToEditor);
    }

    onTitleIsOverridden($event) {
        const checked = $event.target.checked;
        console.log('#### onTitleIsOverridden checked:', checked);
        this.titleToEditor.isOverridden = !this.titleToEditor.isOverridden;
        /*if (this.titleToEditor.isOverridden === false) {
      const selectedTitle = this.availableTitles.find( x => x.id === this.titleToEditor.titleId );
      this.resultstringE.nativeElement.innerHTML = selectedTitle.title;
    } else {

    }*/
    }

    selectRow(title: Title) {
        console.log('#### selectRow title:', title);
        this.resultstringE.nativeElement.innerHTML = title.title;

        this.titleToEditor.titleId = title.id;
        if (this.titleToEditor.templateId == 1) {
            this.titleToEditor.textValue = title.title;
            this.selectedTitleText = title.title;
        } else if (this.titleToEditor.templateId == 2) {
            this.titleToEditor.textValue = title.title + ' (' + title.docRef + ')';
            this.selectedTitleText = title.title + ' (' + title.docRef + ')';
        }
    }

    updateTitleToEditor() {
        this.titleToEditor.textValue = this.selectedTitleText;
    }

    onTemplateChange() {
        console.log('#### this.titleToEditor.titleId:', this.titleToEditor.titleId);
        console.log('#### this.titleToEditor.templateId:', this.titleToEditor.templateId);
        if (this.titleToEditor.titleId > 0 && this.titleToEditor.templateId == 1) {
            const selectedTitle = this.availableTitles.find(
                x => x.id === this.titleToEditor.titleId
            );
            this.selectedTitleText = selectedTitle.title;
            this.titleToEditor.textValue = selectedTitle.title;
        } else if (this.titleToEditor.titleId > 0 && this.titleToEditor.templateId == 2) {
            const selectedTitle = this.availableTitles.find(
                x => x.id === this.titleToEditor.titleId
            );
            this.selectedTitleText = selectedTitle.title + ' (' + selectedTitle.docRef + ')';
            this.titleToEditor.textValue = selectedTitle.title + ' (' + selectedTitle.docRef + ')';
        }
    }
}
