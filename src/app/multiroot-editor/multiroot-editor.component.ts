import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as MultirootEditor from '../../assets/ckeditor.js';
//mport CKEditorInspector from '@ckeditor/ckeditor5-inspector';
import { ContextMenuComponent } from 'ngx-contextmenu';
import { ModalDatePickerComponent } from './modal-date-picker/modal-date-picker.component';
import { ModalTimePickerComponent } from './modal-time-picker/modal-time-picker.component';
import { ModalStringPickerComponent } from './modal-string-picker/modal-string-picker.component';
import {
    ModalListOfSpeakersComponent,
    LspDataToEditor,
} from './modal-list-of-speakers/modal-list-of-speakers.component';
import { ModalTitlesComponent, TitleToEditor } from './modal-titles/modal-titles.component';
import { ModalShowDiffComponent } from './modal-show-diff/modal-show-diff.component';
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

    enableInput;
    enableDelete;
    enableForwardDelete;

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
            MultirootEditor.defaultConfig,
        )
            .then(newEditor => {
                this.Editor = newEditor;
                this.toolbar.nativeElement.appendChild(newEditor.ui.view.toolbar.element);
                // newEditor.setData({ header: '<p>ffsfsfsdfsdfsdfsdfs</p>'});
                // window.editor = newEditor;
                /*newEditor.setData({
                    content:
                        '<p><span class="snippet" data-id="4444123" data-viewmode="infoview" data-type="snp">This is a test snippet <span class="standardword" data-id="1234" data-viewmode="infoview" data-type="str">This is a test</span> blah <span class="variable" data-id="9937" data-viewmode="infoview" data-type="var_date">UNRESOLVED</span> blah</span> kjkjk <span class="variable" data-id="9934" data-viewmode="infoview" data-type="var_date">UNRESOLVED</span> gdfgdd <span class="lsp" data-id="34343" data-viewmode="infoview" data-type="var_sp" data-json="">UNRESOLVED</span> gdgi</p>',
                });*/
                newEditor.setData({
                    content:
                        '<p><span class="title" data-id="34343" data-viewmode="infoview" data-type="title" data-json="">UNRESOLVED</span> gdgi</p>',
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
                newEditor.listenTo(newEditor.editing.view.document, 'mousedown', (evt, data) => {
                    const modelElement = newEditor.editing.mapper.toModelElement(data.target);
                    this.selectedEditorModelElement = modelElement;
                    console.log('contextmenu data:', data);
                    console.log('contextmenu data.target:', data.target);
                    console.log('contextmenu modelElement:', modelElement);
                });

                newEditor.listenTo(newEditor.editing.view.document, 'click', (evt, data) => {
                    const modelElement = newEditor.editing.mapper.toModelElement(data.target);
                    this.selectedEditorModelElement = modelElement;
                    console.log('click data:', data);
                    console.log('click data.target:', data.target);
                    console.log('click modelElement:', modelElement);
                    if (
                        modelElement &&
                        modelElement.parent &&
                        modelElement.parent.name &&
                        modelElement.parent.name === 'snp'
                    ) {
                        setTimeout(() => {
                            this.enableInput = MultirootEditor.disableInput(this.Editor);
                            this.enableDelete = MultirootEditor.disableDelete(this.Editor);
                            this.enableForwardDelete = MultirootEditor.disableForwardDelete(
                                this.Editor,
                            );
                        });
                    } else if (
                        this.enableInput &&
                        typeof this.enableInput === 'function' &&
                        this.enableDelete &&
                        typeof this.enableDelete === 'function' &&
                        this.enableForwardDelete &&
                        typeof this.enableForwardDelete === 'function'
                    ) {
                        setTimeout(() => {
                            this.enableInput();
                            this.enableDelete();
                            this.enableForwardDelete();
                        });
                    }
                });
                console.log('#### newEditor.commands:', newEditor.commands);
                for (const command of newEditor.commands.commands()) {
                    // Will become `command.enable( 'id' );`.
                    //command.off('set:isEnabled', forceDisable);
                    console.log('#### command:', command);
                    command.isEnabled = false;
                    command.refresh();
                }
                //CKEditorInspector.attach(newEditor);
            })
            .catch(err => {
                console.error(err.stack);
            });
    }

    replaceNbsps(str: string) {
        const re = new RegExp(String.fromCharCode(160), 'g');
        return str.replace(re, ' ');
    }
    mergeHeaderAndFooter() {
        /*const oMX = new MergeXML(  );
        console.log('#### MergeXML initiated');
        console.log('#### this.Editor.getData(header):', this.Editor.getData( { rootName: 'header' } ));
        console.log('#### this.Editor.getData(footer):', this.Editor.getData( { rootName: 'footer' } ));
        oMX.AddSource(this.Editor.getData( { rootName: 'header' } ));
        oMX.AddSource(this.Editor.getData( { rootName: 'footer' } ));
        console.log('#### oMX.Get(2):', oMX.Get(2));
        console.log('#### oMX.count:', oMX.count);
        */
        console.log(
            '#### this.Editor.getData( { rootName: header } ):',
            this.Editor.getData({ rootName: 'header' }),
        );
        console.log(
            '#### this.Editor.getData( { rootName: footer } ):',
            this.Editor.getData({ rootName: 'footer' }),
        );
        const docHeader = new DOMParser().parseFromString(
            '<div>' +
                this.Editor.getData({ rootName: 'header' }).replace(/&nbsp;/gi, ' ') +
                '</div>',
            'text/xml',
        );
        const docFooter = new DOMParser().parseFromString(
            '<div>' +
                this.Editor.getData({ rootName: 'footer' }).replace(/&nbsp;/gi, ' ') +
                '</div>',
            'text/xml',
        );

        let footerNodesByParagraph: any = [];
        // first loop footer to store all nodes
        docFooter.querySelectorAll('p').forEach((valueFooter, indexFooter) => {
            const posFooter = indexFooter;
            console.log('#### mergeHeaderAndFooter footer value:', valueFooter);
            const childrenNodes: any = valueFooter.childNodes;
            console.log('#### mergeHeaderAndFooter footer childrenNodes:', childrenNodes);
            childrenNodes.forEach((node, index) => {
                if (node.nodeType === Node.TEXT_NODE) {
                    //Text
                    const obj = {
                        paragraph: posFooter,
                        index: index,
                        type: Node.TEXT_NODE,
                        value: node.textContent,
                        dataId: -1,
                    };
                    footerNodesByParagraph.push(obj);
                } else if (node.nodeType === Node.ELEMENT_NODE) {
                    const obj = {
                        paragraph: posFooter,
                        index: index,
                        type: Node.ELEMENT_NODE,
                        value: node.outerHTML,
                        dataId: node.getAttribute('data-id'),
                    };
                    footerNodesByParagraph.push(obj);
                }
                console.log('#### mergeHeaderAndFooter inner node:', node);
            });
        });
        console.log('#### mergeHeaderAndFooter footerNodesByParagraph:', footerNodesByParagraph);

        const finalHtmlString: any = [];
        docHeader.querySelectorAll('p').forEach((valueHeader, indexHeader) => {
            const posHeader = indexHeader;
            console.log(
                '#### mergeHeaderAndFooter header value.childNodes:',
                valueHeader.childNodes,
            );
            const footerPNodes = footerNodesByParagraph.filter(function (elem) {
                //paragraph footer elements
                return elem.paragraph == posHeader;
            });
            console.log('#### footerPNodes:', footerPNodes);
            //remove current paragraph elements from footer list
            footerNodesByParagraph = footerNodesByParagraph.filter(function (elem) {
                return elem.paragraph != posHeader;
            });
            finalHtmlString.push('<p>');
            const childenNodes: any = valueHeader.childNodes;
            childenNodes.forEach(node => {
                if (node.nodeType == Node.TEXT_NODE) {
                    //Text
                    finalHtmlString.push(node.textContent);
                    const nodeFromFooter = footerPNodes.length > 0 ? footerPNodes[0] : undefined;
                    //if there is also a Text node in footer ignore it. we asume header text is more updated
                    if (nodeFromFooter && nodeFromFooter.type == Node.TEXT_NODE) {
                        footerPNodes.shift();
                    }
                } else if (node.nodeType == Node.ELEMENT_NODE) {
                    //Element
                    console.log('#### HEADER ELEMENT_NODE node.outerHTML:', node.outerHTML);
                    finalHtmlString.push(node.outerHTML);
                    const nodeFromFooter = footerPNodes[0] ? footerPNodes[0] : undefined;
                    if (
                        nodeFromFooter &&
                        nodeFromFooter.type == Node.ELEMENT_NODE &&
                        node.getAttribute('data-id') != nodeFromFooter.dataId
                    ) {
                        finalHtmlString.push(nodeFromFooter.value);
                        footerPNodes.shift();
                    } else if (
                        nodeFromFooter &&
                        nodeFromFooter.type == Node.ELEMENT_NODE &&
                        node.getAttribute('data-id') == nodeFromFooter.dataId
                    ) {
                        footerPNodes.shift();
                    }
                    //console.log('#### mergeHeaderAndFooter node.getAttribute(data-id):', node.getAttribute('data-id'));
                }
                console.log('#### mergeHeaderAndFooter finalHtmlString before:', finalHtmlString);
                console.log('#### mergeHeaderAndFooter inner node:', node);
            });
            console.log('#### mergeHeaderAndFooter footerPNodes:', footerPNodes);
            //if same paragraph in footer contains more nodes add them
            if (footerPNodes && footerPNodes.length > 0) {
                footerPNodes.forEach(node => {
                    finalHtmlString.push(node.value);
                });
            }
            finalHtmlString.push('</p>');
            // remove from footer nodes this paragraph since it has been merged
            footerNodesByParagraph = footerNodesByParagraph.filter(function (elem) {
                //paragraph footer elements
                return elem.paragraph != posHeader;
            });
        });
        console.log(
            '#### mergeHeaderAndFooter finalHtmlString before extra paragraphs:',
            finalHtmlString,
        );
        // if footer contains more paragraphs include them to the final merged document
        console.log('#### footerNodesByParagraph:', footerNodesByParagraph);
        if (footerNodesByParagraph && footerNodesByParagraph.length > 0) {
            const uniqueParagraphs = [
                ...new Set(footerNodesByParagraph.map(item => item.paragraph)),
            ];
            console.log('#### uniqueParagraphs:', uniqueParagraphs);
            uniqueParagraphs.forEach(paragraph => {
                finalHtmlString.push('<p>');
                const currentParagraphElements = footerNodesByParagraph.filter(function (elem) {
                    //paragraph footer elements
                    return elem.paragraph == paragraph;
                });
                currentParagraphElements.forEach(node => {
                    finalHtmlString.push(node.value);
                });
                finalHtmlString.push('<p>');
                footerNodesByParagraph = footerNodesByParagraph.filter(function (elem) {
                    //paragraph footer elements
                    return elem.paragraph != paragraph;
                });
            });
        }
        console.log('#### mergeHeaderAndFooter finalHtmlString:', finalHtmlString);
        this.Editor.setData({ content: finalHtmlString.join('') });
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
            this.selectedEditorModelElement = this.Editor.editing.mapper.toModelElement(domElement);
            console.log(
                '#### onEditorContextMenu this.selectedEditorModelElement:',
                this.selectedEditorModelElement,
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

    showDiff(diffType: string) {
        const modalRef = this.modalService.open(ModalShowDiffComponent, {
            size: 'xl',
        });
        const dataToModal = { footer: '', header: '', diffType: diffType };
        const footerParagraphs = this.footerE.nativeElement.querySelectorAll('p');
        const headerParagraphs = this.headerE.nativeElement.querySelectorAll('p');
        for (const p of footerParagraphs) {
            dataToModal.footer += p.textContent.concat('\r\n');
        }
        for (const p of headerParagraphs) {
            dataToModal.header += p.textContent.concat('\r\n');
        }
        console.log('dataToModal:', dataToModal);
        modalRef.componentInstance.fromParent = dataToModal;
        modalRef.result.then(result => {
            if (result) {
                console.log('#### EDITOR MODAL result:', result);
                console.log(
                    '#### EDITOR MODAL result string:',
                    result.year + '/' + result.month + '/' + result.day,
                );
            }
        });
    }

    onContextMenuResolve($event) {
        console.log('#### onContextMenuResolve $event:', $event);
        console.log('#### onContextMenuResolve $event.data:', $event.data);
        console.log(
            '#### onContextMenuResolve this.Editor.model.document.selection:',
            this.Editor.model.document.selection,
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
            this.Editor.model.document.selection.getSelectedElement(),
        );
        console.log(
            '#### newEditor.view.documentselection.getSelectedElement():',
            this.Editor.model.document.selection.getSelectedElement(),
        );
        console.log(
            '#### newEditor.model.document.selection.getFirstPosition():',
            this.Editor.model.document.selection.getFirstPosition(),
        );

        const viewElement = this.Editor.editing.mapper.toViewElement(modelElement);
        console.log('#### onContextMenuResolve modelElement:', modelElement);
        console.log('#### onContextMenuResolve viewElement:', viewElement);
        if (viewElement.name === 'span' && viewElement.getAttribute('data-type') === 'var_date') {
            const modalRef = this.modalService.open(ModalDatePickerComponent);
            const dataToModal = modelElement.getAttribute('data-content');
            console.log('dataToModal:', dataToModal);
            modalRef.componentInstance.fromParent = dataToModal;
            modalRef.result.then(result => {
                if (result) {
                    console.log('#### EDITOR MODAL result:', result);
                    console.log(
                        '#### EDITOR MODAL result string:',
                        result.year + '/' + result.month + '/' + result.day,
                    );
                    this.Editor.model.change(writer => {
                        console.log(
                            '#### EDITOR MODAL result string:',
                            result.year + '/' + result.month + '/' + result.day,
                        );
                        writer.setAttribute(
                            'data-content',
                            result.year + '/' + result.month + '/' + result.day,
                            modelElement,
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
            modalRef.result.then(result => {
                if (result) {
                    console.log('#### EDITOR MODAL result:', result);
                    this.Editor.model.change(writer => {
                        console.log(
                            '#### EDITOR MODAL result string:',
                            '"' + result.hour + ':' + result.minute + '"',
                        );
                        writer.setAttribute(
                            'data-content',
                            result.hour + ':' + result.minute,
                            modelElement,
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
            modalRef.result.then(result => {
                if (result) {
                    console.log('#### EDITOR MODAL result:', result);
                    console.log('#### EDITOR MODAL result string:', result);
                    this.Editor.model.change(writer => {
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
            const dataToModal: LspDataToEditor =
                modelElement.getAttribute('data-json') &&
                modelElement.getAttribute('data-json') !== ''
                    ? JSON.parse(modelElement.getAttribute('data-json'))
                    : { listOfSpeakers: [], isAndChecked: false, textValue: '' };
            console.log('dataToModal:', dataToModal);
            modalRef.componentInstance.fromParent = dataToModal;
            modalRef.result.then((result: LspDataToEditor) => {
                if (result) {
                    console.log('#### EDITOR MODAL result:', result);
                    console.log('#### EDITOR MODAL result string:', result.textValue);
                    this.Editor.model.change(writer => {
                        writer.setAttribute('data-content', result.textValue, modelElement);
                        writer.setAttribute('data-json', JSON.stringify(result), modelElement);
                    });
                }
            });
        } else if (
            viewElement.name === 'span' &&
            viewElement.getAttribute('data-type') === 'title'
        ) {
            const modalRef = this.modalService.open(ModalTitlesComponent, {
                size: 'xl',
            });
            const dataToModal: TitleToEditor =
                modelElement.getAttribute('data-json') &&
                modelElement.getAttribute('data-json') !== ''
                    ? JSON.parse(modelElement.getAttribute('data-json'))
                    : { titleId: 0, isOverridden: false, templateId: 1, textValue: '' };
            console.log('dataToModal:', dataToModal);
            modalRef.componentInstance.fromParent = dataToModal;
            modalRef.result.then((result: TitleToEditor) => {
                if (result) {
                    console.log('#### EDITOR MODAL result:', result);
                    console.log('#### EDITOR MODAL result string:', result.textValue);
                    this.Editor.model.change(writer => {
                        writer.setAttribute('data-content', result.textValue, modelElement);
                        writer.setAttribute('data-json', JSON.stringify(result), modelElement);
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

            editor.model.change(writer => {
                const insertPosition2 = data.dropRange.start;
                const modelPosition = editor.editing.mapper.toModelPosition(insertPosition2);

                //const selection = editor.model.document.selection;

                // var currentAttributes = selection.getAttributes();
                // var parent = selection.focus.parent;
                // var insertPosition = selection.focus;

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
                    editor.model.insertContent(
                        modelFragment.getChild(0).getChild(0),
                        modelPosition,
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

    hasMakeAllText() {
        const modelElement = this.selectedEditorModelElement;
        if (
            modelElement &&
            modelElement.parent &&
            modelElement.parent.name &&
            modelElement.parent.name === 'paragraph'
        ) {
            return true;
        }
        return false;
    }

    hasMakeTextNoVars() {
        const modelElement = this.selectedEditorModelElement;
        if (
            modelElement &&
            modelElement.name === 'snp' &&
            modelElement.parent &&
            modelElement.parent.name &&
            modelElement.parent.name === 'paragraph'
        ) {
            return true;
        }
        return false;
    }

    makeAllText() {
        const modelElement = this.selectedEditorModelElement;
        console.log(
            '#### makeFreeText this.selectedEditorModelElement:',
            this.selectedEditorModelElement,
        );
        console.log('#### makeFreeText modelElement:', modelElement);
        if (
            modelElement &&
            modelElement.parent &&
            modelElement.parent.name &&
            modelElement.parent.name === 'paragraph'
        ) {
            console.log('#### makeFreeText modelElement.parent.name:', modelElement.parent.name);
            const viewElement = this.Editor.editing.mapper.toViewElement(modelElement);
            const doc = new DOMParser().parseFromString('', 'text/html');
            console.log('#### makeFreeText doc:', doc);
            const node = this.Editor.editing.view.domConverter.viewToDom(
                viewElement,
                doc,
                false,
                true,
            );
            const textContent = node.textContent;
            console.log('#### makeFreeText node:', node);
            console.log('#### makeFreeText node.textContent:', node.textContent);
            const finalText = textContent.replace(
                /(({var_time:[^:]*:)|(})|({var_date:[^:]*:)|(})|({var_str:[^:]*:)|(})|({str:[^:]*:)|(}))/g,
                '',
            );
            console.log('#### makeFreeText finalText:', finalText);
            this.Editor.model.change(writer => {
                writer.remove(modelElement);
                const insertPosition = this.Editor.model.document.selection.getFirstPosition();
                writer.insertText(finalText, {}, insertPosition);
            });
        }
    }

    makeTextWithVariables() {
        const modelElement = this.selectedEditorModelElement;
        if (
            modelElement &&
            MultirootEditor.isElement(modelElement) &&
            modelElement.parent &&
            modelElement.parent.name &&
            modelElement.parent.name === 'paragraph'
        ) {
            this.Editor.model.change(writer => {
                writer.remove(modelElement);
            });

            const childs = modelElement.getChildren();
            for (const element of childs) {
                console.log('#### makeFreeText modelElement child element:', element);
                if (MultirootEditor.isElement(element)) {
                    console.log('#### makeFreeText modelElement child is ELEMENT:');
                    this.Editor.model.change(writer => {
                        const insertPosition = this.Editor.model.document.selection.getFirstPosition();
                        writer.insert(element, insertPosition);
                    });
                } else if (MultirootEditor.isText(element)) {
                    console.log('#### makeFreeText modelElement child is TEXT:');
                    this.Editor.model.change(writer => {
                        const insertPosition = this.Editor.model.document.selection.getFirstPosition();
                        writer.insertText(element.data, {}, insertPosition);
                    });
                }
            }
        }
    }
}
