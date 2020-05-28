import { Component } from '@angular/core';
import LIST_OF_SPEAKERS from './list.of.speakers';

interface Lsp {
    datatype: string;
    datadesc: string;
}
@Component({
    selector: 'app-lsp-sidebar',
    templateUrl: './lsp-sidebar.component.html',
    styleUrls: ['./lsp-sidebar.component.css'],
})
export class LspSidebarComponent {
    lsps: Lsp[] = LIST_OF_SPEAKERS;

    drag(ev, type) {
        const parser = new DOMParser();
        const html_doc = parser.parseFromString(ev.target.innerHTML, 'text/html');
        let myElement;
        if (type === 'span') {
            myElement = html_doc.querySelector('span[data-type]');
        } else {
            myElement = html_doc.querySelector('p');
        }
        myElement.setAttribute('data-id', Math.floor(Math.random() * 1000));
        myElement.setAttribute('data-content', 'UNRESOLVED');
        myElement.textContent = 'UNRESOLVED';

        ev.dataTransfer.setData('text/html', myElement.outerHTML);
        if (type == 'span') {
            ev.dataTransfer.setData('text/plain', 'span');
        } else {
            ev.dataTransfer.setData('text/plain', 'paragraph');
        }
        ev.dataTransfer.dropEffect = 'copy';
    }
}
