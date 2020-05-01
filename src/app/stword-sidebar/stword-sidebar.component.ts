import { Component, Input, Output, EventEmitter } from '@angular/core';
import STANDARD_WORDS from './standard.word';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';

interface StandardWord {
    dataid: string;
    datacontent: string;
}

@Component({
    selector: 'app-stword-sidebar',
    templateUrl: './stword-sidebar.component.html',
    styleUrls: ['./stword-sidebar.component.css'],
})
export class StwordSidebarComponent {
    @Input() closeButton: string;
    @Output() messageToEmit = new EventEmitter<string>();

    closeWindowMessage = 'closeWindow';

    stwords: StandardWord[] = STANDARD_WORDS;
    searchText: string;

    faWindowClose = faWindowClose;

    sendMessageToParent(message: string) {
        console.log('sendMessageToParent');
        this.messageToEmit.emit(message);
    }

    drag(ev, type) {
        const parser = new DOMParser();
        const html_doc = parser.parseFromString(ev.target.outerHTML, 'text/html');
        let myElement;
        if (type === 'span') {
            myElement = html_doc.querySelector('span[data-id]');
        } else {
            myElement = html_doc.querySelector('p');
        }

        ev.dataTransfer.setData('text/html', myElement.outerHTML);
        if (type == 'span') {
            ev.dataTransfer.setData('text/plain', 'span');
        } else {
            ev.dataTransfer.setData('text/plain', 'paragraph');
        }
        ev.dataTransfer.dropEffect = 'copy';
    }
}
