import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as MultirootEditor from '../assets/ckeditor.js'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('toolbar', { static: false }) toolbar: ElementRef;
  @ViewChild('header', { static: false }) headerE: ElementRef;
  @ViewChild('content', { static: false }) contentE: ElementRef;
  @ViewChild('footer', { static: false }) footerE: ElementRef;

  title = 'test-ed';
  public Editor = MultirootEditor;

  ngAfterViewInit() {
    console.log('#### headerE.nativeElement:', this.headerE.nativeElement);
    MultirootEditor
      .create({ header: this.headerE.nativeElement,
                content: this.contentE.nativeElement,
                footer: this.footerE.nativeElement
              }, MultirootEditor.defaultConfig)
      .then(newEditor => {
        this.toolbar.nativeElement.appendChild(newEditor.ui.view.toolbar.element);
        //newEditor.setData({ header: '<p>ffsfsfsdfsdfsdfsdfs</p>'});
        //window.editor = newEditor;
      })
      .catch(err => {
        console.error(err.stack);
      });
  }
}
