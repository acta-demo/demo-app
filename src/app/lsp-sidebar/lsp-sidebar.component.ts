import { Component } from '@angular/core';
import REFERENCES from './list.of.speakers';
import { GlobalVariables } from '../common/global.varibles';

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
    lsps: Lsp[] = REFERENCES;

    drag(ev, type) {
        const parser = new DOMParser();
        const html_doc = parser.parseFromString(ev.target.innerHTML, 'text/html');
        let myElement;
        if (type === 'span') {
            myElement = html_doc.querySelector('span[data-type]');
        } else {
            myElement = html_doc.querySelector('p');
        }
        console.log('#### myElement.getAttribute(data-type):', myElement.getAttribute('data-type'));
        if(myElement.getAttribute('data-type') == 'var_sp') {
            myElement.setAttribute('class', 'lsp');
        } else if(myElement.getAttribute('data-type') == 'title') {
            myElement.setAttribute('class', 'title');
            myElement.setAttribute('data-json', '');
        }
        //myElement.setAttribute('class', 'lsp');
        myElement.setAttribute('data-id', Math.floor(Math.random() * 1000));
        myElement.setAttribute('data-language', GlobalVariables.docLanguage);
        //myElement.setAttribute('data-content', 'UNRESOLVED');
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
