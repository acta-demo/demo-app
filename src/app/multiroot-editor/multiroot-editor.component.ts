import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as MultirootEditor from '../../assets/ckeditor.js';
import CKEditorInspector from '@ckeditor/ckeditor5-inspector';
import { MatMenuTrigger } from '@angular/material';

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
  @ViewChild( MatMenuTrigger, { static: false } ) contextMenu: MatMenuTrigger;

  contextMenuPosition = { x: '0px', y: '0px' };

  Editor = MultirootEditor;
  isHeaderCollapsed = false;
  isContentCollapsed = false;
  isFooterCollapsed = false;
  showHeaderFooter = true;
  contentParentHeight = '300';

  contextmenu = false;
  contextmenuX = 0;
  contextmenuY = 0;

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
        newEditor.setData({ content: '<p><span class="standardword" data-id="1234">This is a test</span></p>' });
        this.editorDrop(newEditor);
        //CKEditorInspector.attach(newEditor);
      })
      .catch(err => {
        console.error(err.stack);
      });

  }

  onContextMenu(event: MouseEvent, item: string) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { 'item': item };
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }

  onContextMenuDelete(item: Item) {
    const keyEvent = new KeyboardEvent("keydown", {key : "Backspace"});
    this.contentE.nativeElement.dispatchEvent(keyEvent);
  }
  onEditorContextMenu($event) {
    $event.preventDefault();
    console.log('MOUSE DOWN ON EDITOR');
    this.contextmenuX = $event.clientX
    this.contextmenuY = $event.clientY
    this.contextmenu = true;
    //const keyEvent = new KeyboardEvent("keydown", {key : "Backspace"});
    //this.contentE.nativeElement.dispatchEvent(keyEvent);
  }
  editorDrop(editor) {
    editor.editing.view.document.on('drop', (evt, data) => {

      evt.stop();
      data.preventDefault();

      var _myData = data.dataTransfer.getData("text/html");
      var _myDataExtraInfo = data.dataTransfer.getData("text/plain");

      editor.model.change(function (writer) {
        var insertPosition2 = data.dropRange.start;
        var modelPosition = editor.editing.mapper.toModelPosition(insertPosition2);

        var selection = editor.model.document.selection;

        var currentAttributes = selection.getAttributes();
        var parent = selection.focus.parent;
        var insertPosition = selection.focus;

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