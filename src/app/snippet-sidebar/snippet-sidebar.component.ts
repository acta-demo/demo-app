import { Component, AfterViewInit, Input, Output, EventEmitter, Pipe, PipeTransform } from '@angular/core';
import SNIPPETS from './snippets';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { DomSanitizer } from '@angular/platform-browser'

interface Snippet {
  dataid: string;
  datacontent: string;
}

@Pipe({ name: 'safeHtml'})
export class SafeHtmlPipe implements PipeTransform  {
  constructor(private sanitized: DomSanitizer) {}
  transform(value) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}

@Component({
  selector: 'app-snippet-sidebar',
  templateUrl: './snippet-sidebar.component.html',
  styleUrls: ['./snippet-sidebar.component.css']
})
export class SnippetSidebarComponent implements AfterViewInit {

  @Input() closeButton: string;
  @Output() messageToEmit = new EventEmitter<string>();

  closeWindowMessage: string = "closeWindow";
  snippets: Snippet[] = SNIPPETS;
  searchText: string;

  faWindowClose = faWindowClose;
  constructor() { }

  ngAfterViewInit() {
  }

  sendMessageToParent(message: string) {
    console.log('sendMessageToParent');
    this.messageToEmit.emit(message)
  }

  drag(ev, type) {
    const parser = new DOMParser();
    const html_doc = parser.parseFromString(ev.target.outerHTML, "text/html");
    let myElement;
    if (type === 'span') {
      myElement = html_doc.querySelector("span[data-id]");
    } else {
      myElement = html_doc.querySelector("p");
    }
console.log('#### drag myElement.outerHTML:', myElement.outerHTML);
    ev.dataTransfer.setData('text/html', myElement.outerHTML);
    if (type == 'span') {
      ev.dataTransfer.setData('text/plain', 'span');
    } else {
      ev.dataTransfer.setData('text/plain', 'paragraph');
    }
    ev.dataTransfer.dropEffect = "copy";
  }

  onKeyPress($event) {
    const inputValue = $event.target.value;
  }


}
