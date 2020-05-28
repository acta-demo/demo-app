import { Component } from '@angular/core';
import VARIABLES from './variables';

interface Variable {
    datatype: string;
    datadesc: string;
}
@Component({
    selector: 'app-variable-sidebar',
    templateUrl: './variable-sidebar.component.html',
    styleUrls: ['./variable-sidebar.component.css'],
})
export class VariableSidebarComponent {
    variables: Variable[] = VARIABLES;

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
