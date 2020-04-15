import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as MultirootEditor from '../../assets/ckeditor.js';
import CKEditorInspector from '@ckeditor/ckeditor5-inspector';
import { MatMenuTrigger } from '@angular/material';
import { ContextMenuComponent } from 'ngx-contextmenu';

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
  @ViewChild(ContextMenuComponent, { static: false }) public basicMenu: ContextMenuComponent;



  Editor = MultirootEditor;
  isHeaderCollapsed = false;
  isContentCollapsed = false;
  isFooterCollapsed = false;
  showHeaderFooter = true;
  contentParentHeight = '300';

showMessage(message: any) {
    console.log(message);
  }
  ngAfterViewInit() {

    MultirootEditor
      .create({
        header: this.headerE.nativeElement,
        content: this.contentE.nativeElement,
        footer: this.footerE.nativeElement
      }, MultirootEditor.defaultConfig)
      .then(newEditor => {
        this.Editor = newEditor;
        this.toolbar.nativeElement.appendChild(newEditor.ui.view.toolbar.element);
        //newEditor.setData({ header: '<p>ffsfsfsdfsdfsdfsdfs</p>'});
        //window.editor = newEditor;
        newEditor.setData({ content: '<p><span class="snippet" data-id="4444123" data-viewmode="infoview" data-type="snp">This is a test snippet <span class="standardword" data-id="1234" data-viewmode="infoview" data-type="str">This is a test</span> blah blah</span> kjkjk</p>' });
        this.editorDrop(newEditor);
        CKEditorInspector.attach(newEditor);
      })
      .catch(err => {
        console.error(err.stack);
      });

  }

  onContextMenuDelete($event) {
    const keyEvent = new KeyboardEvent("keydown", {key : "Backspace"});
    this.contentE.nativeElement.dispatchEvent(keyEvent);
  }

  editorDrop(editor) {
    editor.editing.view.document.on('drop', (evt, data) => {

      evt.stop();
      data.preventDefault();

      const _myData = data.dataTransfer.getData("text/html");
      const _myDataExtraInfo = data.dataTransfer.getData("text/plain");

      editor.model.change(function (writer) {
        const insertPosition2 = data.dropRange.start;
        const modelPosition = editor.editing.mapper.toModelPosition(insertPosition2);

        const selection = editor.model.document.selection;

        //var currentAttributes = selection.getAttributes();
        //var parent = selection.focus.parent;
        //var insertPosition = selection.focus;

        const viewFragment = editor.data.processor.toView(_myData);
        console.log('drop viewFragment:', viewFragment);


        let viewFragment2;
        if (_myDataExtraInfo === 'span') {
          viewFragment2 = editor.data.processor.toView('<p>' + _myData + '</p>');
        } else {
          viewFragment2 = editor.data.processor.toView(_myData);
        }

        const modelFragment = editor.data.toModel(viewFragment2);
        if (_myDataExtraInfo === 'span') {
          editor.model.insertContent(modelFragment.getChild(0).getChild(0), modelPosition);
        } else {
          editor.model.insertContent(modelFragment, modelPosition);
        }

      });

    });

  }

  onHeaderFooter($event) {
    this.showHeaderFooter = !this.showHeaderFooter;
    if(this.showHeaderFooter) {
      this.contentParentHeight = '300';
    } else {
      this.contentParentHeight = '500';
    }
  }

}

export interface Item {
  id: number;
  name: string;
}