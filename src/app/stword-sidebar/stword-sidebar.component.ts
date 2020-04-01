import { Component, AfterViewInit } from '@angular/core';
import STANDARD_WORDS from './standard.word';


interface StandardWord {
  dataid: string;
  datacontent: string;
}

@Component({
  selector: 'app-stword-sidebar',
  templateUrl: './stword-sidebar.component.html',
  styleUrls: ['./stword-sidebar.component.css']
})
export class StwordSidebarComponent implements AfterViewInit {

  stwords: StandardWord[] = STANDARD_WORDS;
  searchText: string;

  constructor() { }

  ngAfterViewInit() {
  }

  drag(ev, type) {

    var parser = new DOMParser();
    var html_doc = parser.parseFromString(ev.target.outerHTML, "text/html");
    var myElement;
    if (type === 'span') {
      myElement = html_doc.querySelector("span[data-id]");
    } else {
      myElement = html_doc.querySelector("p");
    }

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
