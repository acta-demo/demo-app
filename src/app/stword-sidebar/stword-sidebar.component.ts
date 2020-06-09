import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import STANDARD_WORDS from './standard.word';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { GlobalVariables } from '../common/global.varibles';

interface StandardWord {
    dataid: string;
    datacontent: string;
    language: string;
}

@Component({
    selector: 'app-stword-sidebar',
    templateUrl: './stword-sidebar.component.html',
    styleUrls: ['./stword-sidebar.component.css'],
})
export class StwordSidebarComponent implements OnInit {
    @Input() closeButton: string;
    @Output() messageToEmit = new EventEmitter<string>();

    closeWindowMessage = 'closeWindow';

    stwords: StandardWord[] = STANDARD_WORDS;
    stwordsToDisplay: StandardWord[];
    searchText: string;

    faWindowClose = faWindowClose;

    ngOnInit(): void {
        this.stwordsToDisplay = this.stwords.filter(str => str.language == 'en');
    }

    sendMessageToParent(message: string) {
        console.log('sendMessageToParent');
        this.messageToEmit.emit(message);
    }

    drag(ev, type) {
        console.log(
            '#### StwordSidebarComponent GlobalVariables.docLanguage:',
            GlobalVariables.docLanguage
        );
        const parser = new DOMParser();
        const html_doc = parser.parseFromString(ev.target.outerHTML, 'text/html');
        let myElement;
        if (type === 'span') {
            myElement = html_doc.querySelector('span[data-id]');
        } else {
            myElement = html_doc.querySelector('p');
        }
        myElement.setAttribute('class', 'standardword');
        myElement.setAttribute('data-language', GlobalVariables.docLanguage);
        console.log('#### myElement data-id:', myElement.getAttribute('data-id'));

        const str = this.stwords.find(
            str =>
                str.dataid == myElement.getAttribute('data-id') &&
                str.language == GlobalVariables.docLanguage
        );
        myElement.innerHTML = str.datacontent;

        ev.dataTransfer.setData('text/html', myElement.outerHTML);
        if (type == 'span') {
            ev.dataTransfer.setData('text/plain', 'span');
        } else {
            ev.dataTransfer.setData('text/plain', 'paragraph');
        }
        ev.dataTransfer.dropEffect = 'copy';
    }
}
