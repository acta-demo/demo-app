import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import {
    faFile,
    faCubes,
    faAngleDoubleLeft,
    faAngleDoubleRight,
    faFileAlt,
    faFileArchive,
} from '@fortawesome/free-solid-svg-icons';
import { LoadDataService, LoadData } from './services/load.data.service';
import { ChangeLanguageService } from './services/change.language.service';
import DOCUMENT_DATA from './document.data';
import { GlobalVariables } from './common/global.varibles';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    @ViewChild('myForm', { static: false }) myForm: ElementRef;

    toggleStatus = false;
    menuFile: string[] = ['Open document', 'Open template'];
    menuBB: string[] = ['List of speakers', 'Snippets', 'Strings', 'Variables'];
    searchMenuElements: string[] = ['Strings', 'Snippets', 'Variables', 'List of speakers'];
    selectedMenuElement = '';
    faFile = faFile;
    faCubes = faCubes;
    faAngleDoubleLeft = faAngleDoubleLeft;
    faAngleDoubleRight = faAngleDoubleRight;
    faFileAlt = faFileAlt;
    faFileArchive = faFileArchive;
    closeButton = 'true';
    receivedStwordMessage: string;
    docLanguage: string = 'en';

    documents: any[] = [...DOCUMENT_DATA];
    documentInfoMetadata: string = '';

    constructor(private el: ElementRef, private renderer: Renderer2,
        private loaddataService: LoadDataService,
        private changeLanguageService: ChangeLanguageService) {}

    loadData(language: string, type: string): void {  
        const document = this.documents.find(doc => doc.language == language && doc.type == type);
        this.documentInfoMetadata = document.metadata;
        const data: LoadData = {language: language, type: type};
        this.loaddataService.clearMessages();
        this.loaddataService.loadData(data);
    }

    setDocumentLanguage(language: string): void {
        this.docLanguage = language;
        GlobalVariables.docLanguage = this.docLanguage;
        this.changeLanguageService.changeLanguage(this.docLanguage);
    }

    getStwordMessage(message: string) {
        console.log('receivedStwordMessage:', this.receivedStwordMessage);
        this.receivedStwordMessage = message;
        this.myForm.nativeElement.style.display = 'none';
    }
    openForm() {
        console.log('myForm:', this.myForm);
        this.myForm.nativeElement.style.display = 'block';
    }

    closeForm() {
        this.myForm.nativeElement.style.display = 'none';
    }

    onFileElementClick($event, element) {
        this.menuFile.sort(function (x, y) {
            return x === element ? -1 : y === element ? 1 : 0;
        });
        this.selectedMenuElement = element;
        console.log('this.menuFile:', this.menuFile);
    }

    onBBElementClick($event, element) {
        /*this.menuBB.sort(function (x, y) {
            return x === element ? -1 : y === element ? 1 : 0;
        });*/
        this.selectedMenuElement = element;
        console.log('this.menuBB:', this.menuBB);
        /*const intersection: string[] = this.menuBB.filter(value =>
            this.searchMenuElements.includes(value),
        );
        if (intersection.length > 0) {
            console.log('INTERSECTION');
        }*/
    }

    onToggle($event) {
        $event.preventDefault();
        this.toggleStatus = !this.toggleStatus;
    }
}
