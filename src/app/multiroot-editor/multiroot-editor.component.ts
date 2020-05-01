import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as MultirootEditor from '../../assets/ckeditor.js';
import CKEditorInspector from '@ckeditor/ckeditor5-inspector';
import { ContextMenuComponent } from 'ngx-contextmenu';
import { ModalDatePickerComponent } from './modal-date-picker/modal-date-picker.component';
import { ModalTimePickerComponent } from './modal-time-picker/modal-time-picker.component';
import { ModalStringPickerComponent } from './modal-string-picker/modal-string-picker.component';
import {
  ModalListOfSpeakersComponent,
  LspDataToEditor,
} from './modal-list-of-speakers/modal-list-of-speakers.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-multiroot-editor',
  templateUrl: './multiroot-editor.component.html',
  styleUrls: ['./multiroot-editor.component.css'],
})
export class MultirootEditorComponent implements AfterViewInit {
  @ViewChild('toolbar', { static: false }) toolbar: ElementRef;
  @ViewChild('header', { static: false }) headerE: ElementRef;
  @ViewChild('content', { static: false }) contentE: ElementRef;
  @ViewChild('footer', { static: false }) footerE: ElementRef;
  @ViewChild(ContextMenuComponent, { static: false })
  public basicMenu: ContextMenuComponent;
  @ViewChild('datepicker', { static: false }) datepickerE: ElementRef;

  public Editor = MultirootEditor;
  isHeaderCollapsed = false;
  isContentCollapsed = false;
  isFooterCollapsed = false;
  showHeaderFooter = true;
  contentParentHeight = '300';
  closeResult = '';
  selectedEditorModelElement: any;

  constructor(private modalService: NgbModal) {}

  showMessage(message: any) {
    console.log(message);
  }
  ngAfterViewInit() {
    MultirootEditor.create(
      {
        header: this.headerE.nativeElement,
        content: this.contentE.nativeElement,
        footer: this.footerE.nativeElement,
      },
      MultirootEditor.defaultConfig
    )
      .then((newEditor) => {
        this.Editor = newEditor;
        this.toolbar.nativeElement.appendChild(
          newEditor.ui.view.toolbar.element
        );
        // newEditor.setData({ header: '<p>ffsfsfsdfsdfsdfsdfs</p>'});
        // window.editor = newEditor;
        newEditor.setData({
          content:
            '<p><span class="snippet" data-id="4444123" data-viewmode="infoview" data-type="snp">This is a test snippet <span class="standardword" data-id="1234" data-viewmode="infoview" data-type="str">This is a test</span> blah <span class="variable" data-id="9937" data-viewmode="infoview" data-type="var_date">UNRESOLVED</span> blah</span> kjkjk <span class="variable" data-id="9934" data-viewmode="infoview" data-type="var_date">UNRESOLVED</span> gdfgdd <span class="lsp" data-id="34343" data-viewmode="infoview" data-type="var_sp" data-json="{}">UNRESOLVED</span> gdgi</p>',
        });
        this.editorDrop(newEditor);
        /// ///////////////////////
        console.log('newEditor.ui.view:', newEditor.ui.view);
        const containers = newEditor.ui.view.editables;
        for (const container of containers) {
          if (container && container.element) {
            // container.element.addEventListener('contextmenu', this.onEditorContextMenu);
          }
        }
        /// ///////////////////////
        newEditor.listenTo(
          newEditor.editing.view.document,
          'mousedown',
          (evt, data) => {
            const modelElement = newEditor.editing.mapper.toModelElement(
              data.target
            );
            this.selectedEditorModelElement = modelElement;
            console.log('contextmenu data:', data);
            console.log('contextmenu data.target:', data.target);
            console.log('contextmenu modelElement:', modelElement);
          }
        );
        // CKEditorInspector.attach(newEditor);
      })
      .catch((err) => {
        console.error(err.stack);
      });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onEditorContextMenu($event) {
    console.log('#### onEditorContextMenu $event:', $event);
    const domElement = $event.target || $event.srcElement;
    console.log('#### onEditorContextMenu domElement:', domElement);
    if (this.Editor == null) {
      this.selectedEditorModelElement = this.Editor.editing.mapper.toModelElement(
        domElement
      );
      console.log(
        '#### onEditorContextMenu this.selectedEditorModelElement:',
        this.selectedEditorModelElement
      );
    }
    // const modelElement = this.Editor.editing.mapper.toModelElement(domElement);
    // this.selectedEditorModelElement = modelElement;
  }
  onContextMenuDelete($event) {
    console.log('#### onContextMenuDelete $event:', $event);
    const keyEvent = new KeyboardEvent('keydown', { key: 'Backspace' });
    this.contentE.nativeElement.dispatchEvent(keyEvent);
  }

  onContextMenuResolve($event) {
    console.log('#### onContextMenuResolve $event:', $event);
    console.log('#### onContextMenuResolve $event.data:', $event.data);
    console.log(
      '#### onContextMenuResolve this.Editor.model.document.selection:',
      this.Editor.model.document.selection
    );

    let modelElement;
    if (this.Editor.model.document.selection.getSelectedElement()) {
      modelElement = this.Editor.model.document.selection.getSelectedElement();
    } else {
      modelElement = this.selectedEditorModelElement;
    }
    // let modelElement = this.Editor.model.document.selection.getSelectedElement();
    console.log(
      '#### newEditor.model.document.selection.getSelectedElement():',
      this.Editor.model.document.selection.getSelectedElement()
    );
    console.log(
      '#### newEditor.view.documentselection.getSelectedElement():',
      this.Editor.model.document.selection.getSelectedElement()
    );
    console.log(
      '#### newEditor.model.document.selection.getFirstPosition():',
      this.Editor.model.document.selection.getFirstPosition()
    );

    const viewElement = this.Editor.editing.mapper.toViewElement(modelElement);
    console.log('#### onContextMenuResolve modelElement:', modelElement);
    console.log('#### onContextMenuResolve viewElement:', viewElement);
    if (
      viewElement.name === 'span' &&
      viewElement.getAttribute('data-type') === 'var_date'
    ) {
      const modalRef = this.modalService.open(ModalDatePickerComponent);
      const dataToModal = modelElement.getAttribute('data-content');
      console.log('dataToModal:', dataToModal);
      modalRef.componentInstance.fromParent = dataToModal;
      modalRef.result.then((result) => {
        if (result) {
          console.log('#### EDITOR MODAL result:', result);
          console.log(
            '#### EDITOR MODAL result string:',
            result.year + '/' + result.month + '/' + result.day
          );
          this.Editor.model.change((writer) => {
            console.log(
              '#### EDITOR MODAL result string:',
              result.year + '/' + result.month + '/' + result.day
            );
            writer.setAttribute(
              'data-content',
              result.year + '/' + result.month + '/' + result.day,
              modelElement
            );
          });
        }
      });
    } else if (
      viewElement.name === 'span' &&
      viewElement.getAttribute('data-type') === 'var_time'
    ) {
      const modalRef = this.modalService.open(ModalTimePickerComponent);
      const dataToModal = modelElement.getAttribute('data-content');
      console.log('dataToModal:', dataToModal);
      modalRef.componentInstance.fromParent = dataToModal;
      modalRef.result.then((result) => {
        if (result) {
          console.log('#### EDITOR MODAL result:', result);
          console.log(
            '#### EDITOR MODAL result string:',
            result.hour + ':' + result.minute
          );
          this.Editor.model.change((writer) => {
            console.log(
              '#### EDITOR MODAL result string:',
              '"' + result.hour + ':' + result.minute + '"'
            );
            writer.setAttribute(
              'data-content',
              result.hour + ':' + result.minute,
              modelElement
            );
          });
        }
      });
    } else if (
      viewElement.name === 'span' &&
      viewElement.getAttribute('data-type') === 'var_str'
    ) {
      const modalRef = this.modalService.open(ModalStringPickerComponent);
      const dataToModal = modelElement.getAttribute('data-content');
      console.log('dataToModal:', dataToModal);
      modalRef.componentInstance.fromParent = dataToModal;
      modalRef.result.then((result) => {
        if (result) {
          console.log('#### EDITOR MODAL result:', result);
          console.log('#### EDITOR MODAL result string:', result);
          this.Editor.model.change((writer) => {
            console.log('#### EDITOR MODAL result string:', result);
            writer.setAttribute('data-content', result, modelElement);
          });
        }
      });
    } else if (
      viewElement.name === 'span' &&
      viewElement.getAttribute('data-type') === 'var_sp'
    ) {
      const modalRef = this.modalService.open(ModalListOfSpeakersComponent, {
        size: 'xl',
      });
      const dataToModal = modelElement.getAttribute('data-json');
      console.log('dataToModal:', dataToModal);
      modalRef.componentInstance.fromParent = dataToModal;
      modalRef.result.then((result: LspDataToEditor) => {
        if (result) {
          console.log('#### EDITOR MODAL result:', result);
          console.log('#### EDITOR MODAL result string:', result.textValue);
          this.Editor.model.change((writer) => {
            writer.setAttribute('data-content', result.textValue, modelElement);
            writer.setAttribute(
              'data-json',
              JSON.stringify(result),
              modelElement
            );
          });
        }
      });
    }
  }

  editorDrop(editor) {
    editor.editing.view.document.on('drop', (evt, data) => {
      evt.stop();
      data.preventDefault();

      const _myData = data.dataTransfer.getData('text/html');
      const _myDataExtraInfo = data.dataTransfer.getData('text/plain');

      editor.model.change((writer) => {
        const insertPosition2 = data.dropRange.start;
        const modelPosition = editor.editing.mapper.toModelPosition(
          insertPosition2
        );

        //const selection = editor.model.document.selection;

        // var currentAttributes = selection.getAttributes();
        // var parent = selection.focus.parent;
        // var insertPosition = selection.focus;

        const viewFragment = editor.data.processor.toView(_myData);
        console.log('drop viewFragment:', viewFragment);

        let viewFragment2;
        if (_myDataExtraInfo === 'span') {
          viewFragment2 = editor.data.processor.toView(
            '<p>' + _myData + '</p>'
          );
        } else {
          viewFragment2 = editor.data.processor.toView(_myData);
        }

        const modelFragment = editor.data.toModel(viewFragment2);
        if (_myDataExtraInfo === 'span') {
          editor.model.insertContent(
            modelFragment.getChild(0).getChild(0),
            modelPosition
          );
        } else {
          editor.model.insertContent(modelFragment, modelPosition);
        }
      });
    });
  }

  onHeaderFooter($event) {
    this.showHeaderFooter = !this.showHeaderFooter;
    if (this.showHeaderFooter) {
      this.contentParentHeight = '300';
    } else {
      this.contentParentHeight = '500';
    }
  }
}
