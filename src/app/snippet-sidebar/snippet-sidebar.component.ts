import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import SNIPPETS from './snippets';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { GlobalVariables } from '../common/global.varibles';

interface Snippet {
    dataid: string;
    datacontent: string;
    datadesc: string;
    language: string;
}

@Component({
    selector: 'app-snippet-sidebar',
    templateUrl: './snippet-sidebar.component.html',
    styleUrls: ['./snippet-sidebar.component.css'],
})
export class SnippetSidebarComponent implements OnInit {
    @Input() closeButton: string;
    @Output() messageToEmit = new EventEmitter<string>();

    closeWindowMessage = 'closeWindow';
    snippets: Snippet[] = SNIPPETS;
    snippetsToDisplay: Snippet[];
    searchText: string;

    faWindowClose = faWindowClose;

    ngOnInit(): void {
        this.snippetsToDisplay = this.snippets.filter(snp => snp.language == 'en');
    }
    sendMessageToParent(message: string) {
        console.log('sendMessageToParent');
        this.messageToEmit.emit(message);
    }

    drag(ev, type) {
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(ev.target.outerHTML, 'text/html');
        let myElement;
        if (type === 'span') {
            myElement = htmlDoc.querySelector('span[data-id]');
        } else {
            myElement = htmlDoc.querySelector('p');
        }
        console.log('#### myElement.innerHTML:', myElement.innerHTML);
        let dataContent = '';
        const snpElement = this.snippets.filter(
            snp =>
                snp.dataid == myElement.getAttribute('data-id') &&
                snp.language == GlobalVariables.docLanguage
        );

        if (snpElement && snpElement.length > 0) {
            dataContent =
                '<span class="snippet" data-id="' +
                snpElement[0].dataid +
                '" data-type="snp" ' + 
                'data-language="' +GlobalVariables.docLanguage + '">' +
                snpElement[0].datacontent +
                '</span>';
        }
        console.log('#### drag dataContent:', dataContent);
        ev.dataTransfer.setData('text/html', dataContent);
        if (type == 'span') {
            ev.dataTransfer.setData('text/plain', 'span');
        } else {
            ev.dataTransfer.setData('text/plain', 'paragraph');
        }
        ev.dataTransfer.dropEffect = 'copy';
    }
}
