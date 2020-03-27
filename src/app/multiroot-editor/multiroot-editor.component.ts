import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as MultirootEditor from '../../assets/ckeditor.js'

@Component({
  selector: 'app-multiroot-editor',
  templateUrl: './multiroot-editor.component.html',
  styleUrls: ['./multiroot-editor.component.css']
})
export class MultirootEditorComponent implements AfterViewInit {

  @ViewChild('toolbar', { static: false }) toolbar: ElementRef;
  @ViewChild('header', { static: false }) headerE: ElementRef;
  @ViewChild('content', { static: false }) contentE: ElementRef;
  @ViewChild('footer', { static: false }) footerE: ElementRef;

  public Editor = MultirootEditor;
  public isHeaderCollapsed = false;
  public isContentCollapsed = false;
  public isFooterCollapsed = false;

  ngAfterViewInit() {

    MultirootEditor
      .create({
        header: this.headerE.nativeElement,
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

  onHeaderCollapse($event) {
    if(this.headerE.nativeElement.style.display === 'block' || this.headerE.nativeElement.style.display === '') {
      this.headerE.nativeElement.style.display = 'none';
      this.isHeaderCollapsed = true;
    } else {
      this.headerE.nativeElement.style.display = 'block';
      this.isHeaderCollapsed = false;
    }
  }

  onContentCollapse($event) {
    if (this.contentE.nativeElement.style.display === 'block' || this.contentE.nativeElement.style.display === '') {
      this.contentE.nativeElement.style.display = 'none';
      this.isContentCollapsed = true;
    } else {
      this.contentE.nativeElement.style.display = 'block';
      this.isContentCollapsed = false;
    }
  }

  onFooterCollapse($event) {
    if (this.footerE.nativeElement.style.display === 'block' || this.footerE.nativeElement.style.display === '') {
      this.footerE.nativeElement.style.display = 'none';
      this.isFooterCollapsed = true;
    } else {
      this.footerE.nativeElement.style.display = 'block';
      this.isFooterCollapsed = false;
    }
  }

}
