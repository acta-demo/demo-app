import { Component, Input, Renderer2, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
    faWindowClose,
    faPlusSquare,
    faMinusCircle,
    faCheckSquare,
    faMinusSquare,
} from '@fortawesome/free-solid-svg-icons';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import LIST_OF_SPEAKERS from './list.of.speakers';
import { GlobalVariables } from '../../common/global.varibles';

interface ListOfSpeakers {
    id: number;
    fullName: string;
    additionalDescription: string;
    additionalDescriptionDisplay: string;
    title: boolean;
    hasDisplayFunction: boolean;
    hasOnBehalfOfGroup: boolean;
    isBlueCardSpeaker: boolean;
    blueCardStatus: string;
    blueCardName: string;
    behalfOfGroup: string;
    gender: string;
    time: string;
}

export interface LspDataToEditor {
    listOfSpeakers: ListOfSpeakers[];
    isAndChecked: boolean;
    textValue: string;
}

@Component({
    selector: 'app-modal-list-of-speakers',
    templateUrl: './modal-list-of-speakers.component.html',
    styleUrls: ['./modal-list-of-speakers.component.css'],
})
export class ModalListOfSpeakersComponent implements AfterViewInit {
    @ViewChild('resultstring', { static: false }) resultstringE: ElementRef;

    //availableLsp: ListOfSpeakers[] = [...LIST_OF_SPEAKERS];
    availableLsp: ListOfSpeakers[] = (GlobalVariables.docLanguage == 'de') ? LIST_OF_SPEAKERS.de.slice():LIST_OF_SPEAKERS.en.slice();
    searchText: string;

    selectedLsp: ListOfSpeakers[] = [];
    blueCardLsp: ListOfSpeakers[] = [];
    blueCardStatuses: string[] = ['accepted', 'declined'];
    fullString: string;
    andChecked = false;
    lspDataToEditor: LspDataToEditor = {
        listOfSpeakers: [],
        isAndChecked: false,
        textValue: '',
    };

    @Input() fromParent: LspDataToEditor;
    faWindowClose = faWindowClose;
    faPlusSquare = faPlusSquare;
    faMinusCircle = faMinusCircle;
    faCheckSquare = faCheckSquare;
    faMinusSquare = faMinusSquare;

    constructor(public activeModal: NgbActiveModal, private _renderer: Renderer2) {}

    ngAfterViewInit() {
        if (this.fromParent) {
            console.log('#### this.fromParent:', this.fromParent);
            const dataFromEditor: LspDataToEditor = this.fromParent;

            setTimeout(() => {
                this.selectedLsp = dataFromEditor.listOfSpeakers;
                this.andChecked = dataFromEditor.isAndChecked;
                this.resultstringE.nativeElement.innerHTML = dataFromEditor.textValue;
                //set initial values for modal to editor as well
                //this.lspDataToEditor.listOfSpeakers = [...this.selectedLsp];
                this.lspDataToEditor.listOfSpeakers = this.selectedLsp.slice();
                this.lspDataToEditor.isAndChecked = this.andChecked;
                this.lspDataToEditor.textValue = dataFromEditor.textValue;
                console.log('#### this.availableLsp:', this.availableLsp);
                console.log('#### this.selectedLsp:', this.selectedLsp);
                this.availableLsp = this.availableLsp.filter(
                    value => !this.selectedLsp.some(e => e.id === value.id)
                );
                this.blueCardLsp = this.availableLsp
                    .concat(this.selectedLsp)
                    .filter(value => value.isBlueCardSpeaker === true);
                // console.log('#### availableNonIntersection:', availableNonIntersection);
                // this.availableLsp = availableNonIntersection;
            });
            // this.availableLsp = this.availableLsp.filter(value => !dataFromEditor.listOfSpeakers.includes(value));
        } else {
            this.blueCardLsp = this.availableLsp
                .concat(this.selectedLsp)
                .filter(value => value.isBlueCardSpeaker === true);
        }
    }

    closeModal(sendStatus) {
        // console.log('#### dateSelected:', this.dateSelected);
        const sendDataToEditor = sendStatus === 'save' ? this.lspDataToEditor : undefined;
        console.log('#### lsp sendDataToEditor:', sendDataToEditor);
        this.activeModal.close(sendDataToEditor);
    }

    jsonstrignify(obj) {
        return JSON.stringify(obj);
    }

    moveToSelected(id) {
        console.log('#### id:', id);

        const item = this.availableLsp.filter(x => x.id === id);
        console.log('#### item:', item);
        if (item && item.length === 1) {
            this.selectedLsp.push(item[0]);
            this.availableLsp = this.availableLsp.filter(({ id }) => id !== item[0].id);
        }
        this.calculateText();
    }

    moveToAvailable(id) {
        console.log('#### id:', id);

        const item = this.selectedLsp.filter(x => x.id === id);
        console.log('#### item:', item);
        if (item && item.length === 1) {
            this.availableLsp.push(item[0]);
            this.selectedLsp = this.selectedLsp.filter(({ id }) => id !== item[0].id);
        }
        // this.availableLsp.sort(function (a, b) { return a.id - b.id });
        this.availableLsp.sort((a, b) => a.id - b.id);
        this.calculateText();
    }

    calculateText() {
        GlobalVariables.docLanguage == 'de' ? this.calculateTextDE() : this.calculateTextEN();
    }
    calculateTextEN() {
        console.log('#### calculateText selectedLsp:', this.selectedLsp);
        console.log('#### calculateText this.andChecked:', this.andChecked);
        this.fullString = '';
        const size = this.selectedLsp.length;
        for (const [index, value] of this.selectedLsp.entries()) {
            //const finalAnd = (index === size - 1) ? ' and ' : '';
            if (index === size - 1 && this.andChecked) {
                if (value.hasOnBehalfOfGroup) {
                    this.fullString =
                        this.fullString +
                        (this.fullString
                            ? ' and ' +
                              (value.title && value.gender == 'male') ? 'Mr ' : '' +
                              (value.title && value.gender == 'female') ? 'Mrs ' : '' +
                              value.fullName + value.additionalDescription +
                              ', on behalf of the ' +
                              value.behalfOfGroup +
                              ' Group'
                            : value.fullName +
                              ', on behalf of the ' +
                              value.behalfOfGroup +
                              ' Group');
                } else {
                    this.fullString =
                        this.fullString +
                        (this.fullString ? ' and ' + 
                                            ((value.title && value.gender == 'male') ? 'Mr ' : '') +
                                            ((value.title && value.gender == 'female') ? 'Mrs ' : '') + 
                                            value.fullName + value.additionalDescription
                                         : value.fullName + value.additionalDescription);
                }
            } else {
                if (value.hasOnBehalfOfGroup) {
                    this.fullString =
                        this.fullString +
                        (this.fullString
                            ? ', ' +
                              (value.title && value.gender == 'male') ? 'Mr ' : '' +
                              (value.title && value.gender == 'female') ? 'Mrs ' : '' +
                              value.fullName + value.additionalDescription +
                              ', on behalf of the ' +
                              value.behalfOfGroup +
                              ' Group'
                            : value.fullName +
                              ', on behalf of the ' +
                              value.behalfOfGroup +
                              ' Group');
                } else {
                    this.fullString =
                        this.fullString + (this.fullString ? 
                                ', ' +
                                ((value.title && value.gender == 'male') ? 'Mr ' : '') +
                                ((value.title && value.gender == 'female') ? 'Mrs ' : '') + 
                                value.fullName + value.additionalDescription
                                                           : value.fullName + value.additionalDescription);
                }
            }
            if (value.blueCardStatus === 'accepted') {
                this.fullString =
                    this.fullString +
                    ', who also replied to a blue-card question by ' +
                    value.blueCardName;
            } else if (value.blueCardStatus === 'declined') {
                this.fullString =
                    this.fullString +
                    ', who also declined to take a blue-card question by ' +
                    value.blueCardName;
            } else if (value.blueCardStatus === 'accepted-two') {
                this.fullString =
                    this.fullString +
                    ',  who also replied to a blue-card question by ' +
                    value.blueCardName;
            } else if (value.blueCardStatus === '') {
                this.fullString = this.fullString;
            }
            console.log('#### current fullString:', this.fullString);
        }
        //this.lspDataToEditor.listOfSpeakers = [...this.selectedLsp];
        this.lspDataToEditor.listOfSpeakers = this.selectedLsp.slice();
        this.lspDataToEditor.isAndChecked = this.andChecked;
        this.lspDataToEditor.textValue = this.fullString;

        this.resultstringE.nativeElement.innerHTML = this.fullString;
    }

    calculateTextDE() {
        console.log('#### calculateText selectedLsp:', this.selectedLsp);
        console.log('#### calculateText this.andChecked:', this.andChecked);
        this.fullString = '';
        const size = this.selectedLsp.length;
        for (const [index, value] of this.selectedLsp.entries()) {
            //const finalAnd = (index === size - 1) ? ' and ' : '';
            if (index === size - 1 && this.andChecked) {
                if (value.hasOnBehalfOfGroup) {
                    this.fullString =
                        this.fullString +
                        (this.fullString
                            ? ' und ' +
                              (value.title && value.gender == 'male') ? 'Hr. ' : '' +
                              (value.title && value.gender == 'female') ? 'Fr. ' : '' +
                              value.fullName + value.additionalDescription +
                              ', Vorsitzende der ' +
                              value.behalfOfGroup +
                              ' Fraktion,'
                            : value.fullName + value.additionalDescription +
                              ', Vorsitzende der ' +
                              value.behalfOfGroup +
                              ' Fraktion');
                } else {
                    this.fullString =
                        this.fullString +
                        (this.fullString ? 
                                ' und ' + 
                                (value.title && value.gender == 'male') ? 'Hr. ' : '' +
                                (value.title && value.gender == 'female') ? 'Fr. ' : '' +
                                value.fullName + value.additionalDescription
                                         : value.fullName + value.additionalDescription);
                }
            } else {
                if (value.hasOnBehalfOfGroup) {
                    this.fullString =
                        this.fullString +
                        (this.fullString
                            ? ', ' +
                              (value.title && value.gender == 'male') ? 'Hr. ' : '' +
                              (value.title && value.gender == 'female') ? 'Fr. ' : '' +
                              value.fullName + value.additionalDescription +
                              ', Vorsitzende der ' +
                              value.behalfOfGroup +
                              ' Fraktion'
                            : value.fullName + value.additionalDescription +
                              ', Vorsitzende der ' +
                              value.behalfOfGroup +
                              ' Fraktion');
                } else {
                    this.fullString =
                        this.fullString + (this.fullString ? 
                                    ', ' +
                                    (value.title && value.gender == 'male') ? 'Hr. ' : '' +
                                    (value.title && value.gender == 'female') ? 'Fr. ' : '' + 
                                    value.fullName + value.additionalDescription
                                                           : value.fullName + value.additionalDescription);
                }
            }
            if (value.blueCardStatus === 'accepted') {
                this.fullString =
                    this.fullString + ((value.gender == 'male') ? ', der ': ', die ') +
                    unescape('auch eine nach dem Verfahren der \„blauen Karte\“ gestellte Frage von ') +
                    value.blueCardName + ' beantwortet';
            } else if (value.blueCardStatus === 'declined') {
                this.fullString =
                    this.fullString + ((value.gender == 'male') ? ', der ': ', die ') +
                    unescape('auch eine nach dem Verfahren der \„blauen Karte\“ gestellte Frage von ') +
                    value.blueCardName + ' ablehnt';
            } else if (value.blueCardStatus === 'accepted-two') {
                this.fullString =
                    this.fullString + ((value.gender == 'male') ? ', der ': ', die ') +
                    unescape('auch eine nach dem Verfahren der \„blauen Karte\“ gestellte Frage von ') +
                    value.blueCardName + ' beantwortet';
            } else if (value.blueCardStatus === '') {
                this.fullString = this.fullString;
            }
            console.log('#### current fullString:', this.fullString);
        }
        //this.lspDataToEditor.listOfSpeakers = [...this.selectedLsp];
        this.lspDataToEditor.listOfSpeakers = this.selectedLsp.slice();
        this.lspDataToEditor.isAndChecked = this.andChecked;
        this.lspDataToEditor.textValue = this.fullString;

        this.resultstringE.nativeElement.innerHTML = this.fullString;
    }

    /* moveToSelected($event) {
    console.log('#### $event:', $event);
    console.log('#### $event.target:', $event.target);
    console.log('#### $event.target:', $event.target.attributes['data-json'].value);
    const value = $event.target.attributes['data-json'].value;
    const obj = JSON.parse(value);
    this.selectedLsp.push(obj);
    //$event.dataTransfer.setData("application/json", value);
  }*/

    /* drop($event) {
    console.log('#### drop $event:', $event);
    console.log('#### drop $event.dataTransfer.getData:', $event.dataTransfer.getData("application/json"));
    const obj = JSON.parse($event.dataTransfer.getData("application/json"));
    this.selectedLsp.push(obj);
  }*/

    onAndChange($event) {
        const checked = $event.target.checked;
        console.log('#### onAndChange checked:', checked);
        this.andChecked = !this.andChecked;
        this.calculateText();
    }

    allowDrop($event) {
        console.log('#### dragover $event:', $event);
        $event.preventDefault();
    }

    /* onDropSelected($event) {
    this.calculateText();
  }*/

    drop(event: CdkDragDrop<string[]>) {
        if (event.previousContainer !== event.container) {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex
            );
        } else {
            moveItemInArray(this.selectedLsp, event.previousIndex, event.currentIndex);
        }
        this.calculateText();
    }
}
