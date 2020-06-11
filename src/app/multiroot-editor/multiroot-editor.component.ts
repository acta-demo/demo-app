import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import * as MultirootEditor from '../../assets/ckeditor.js';
//import CKEditorInspector from '@ckeditor/ckeditor5-inspector';
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
import { LoadDataService, LoadData } from '../services/load.data.service';
import { ChangeLanguageService } from '../services/change.language.service';
import { Subscription } from 'rxjs';
import { faNotEqual, faObjectGroup } from '@fortawesome/free-solid-svg-icons';
import DOCUMENT_DATA from '../document.data';
import { GlobalVariables } from '../common/global.varibles';

@Component({
    selector: 'app-multiroot-editor',
    templateUrl: './multiroot-editor.component.html',
    styleUrls: ['./multiroot-editor.component.css'],
})
export class MultirootEditorComponent implements AfterViewInit, OnDestroy {
    @ViewChild('toolbar', { static: false }) toolbar: ElementRef;
    @ViewChild('header', { static: false }) headerE: ElementRef;
    @ViewChild('content', { static: false }) contentE: ElementRef;
    @ViewChild('footer', { static: false }) footerE: ElementRef;
    @ViewChild(ContextMenuComponent, { static: false })
    public basicMenu: ContextMenuComponent;
    @ViewChild('datepicker', { static: false }) datepickerE: ElementRef;

    public Editor = MultirootEditor;
    showHeader: boolean = false;
    showFooter: boolean = false;
    contentParentHeight = '630';
    closeResult = '';
    selectedEditorModelElement: any;
    getDataHtml: string;
    documentInfoMetadata: string = 'Document info/metadata';

    messages: any[] = [];
    subscription: Subscription;
    subscriptionLanguage: Subscription;

    //documents: any[] = [...DOCUMENT_DATA];
    documents: any[] = DOCUMENT_DATA.slice();
    faNotEqual = faNotEqual;
    faObjectGroup = faObjectGroup;

    constructor(
        private modalService: NgbModal,
        private loadDataService: LoadDataService,
        private changeLanguageService: ChangeLanguageService
    ) {
        // subscribe to home component messages
        this.subscription = this.loadDataService.getMessage().subscribe(message => {
            if (message) {
                console.log('#### subscription message:', message);
                this.loadData(message);
                this.messages.push(message);
            } else {
                // clear messages when empty message received
                this.messages = [];
            }
        });

        this.subscriptionLanguage = this.changeLanguageService.getMessage().subscribe(message => {
            if (message) {
                console.log('#### subscriptionLanguage message:', message);
                this.changeLanguage(message);
                this.messages.push(message);
            } else {
                // clear messages when empty message received
                this.messages = [];
            }
        });
    }

    loadData(loaddata: LoadData): void {
        console.log('#### documents:', this.documents);
        console.log('#### loaddata:', loaddata);
        const document = this.documents.find(
            doc => doc.language == loaddata.language && doc.doctype == loaddata.doctype
        );
        this.Editor.setData({
            content: unescape(document.datacontent),
        });
        this.documentInfoMetadata = document.metadata;
    }

    changeLanguage(language: string): void {
        GlobalVariables.docLanguage = language;
        this.Editor.set('docLanguage', language);
        this.Editor.setData({
            content: '',
        });
    }

    showMessage(message: any) {
        console.log(message);
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
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
            .then(newEditor => {
                this.Editor = newEditor;
                //newEditor.model.schema.extend('$block', { allowIn: 'tableCell' });
                newEditor.set('docLanguage', 'en');
                //newEditor.model.schema.extend( 'tableCell', { allowContentOf: ['$root', '$block', '$text', 'paragraph', 'str', 'snp'] } );
                this.toolbar.nativeElement.appendChild(newEditor.ui.view.toolbar.element);
                // newEditor.setData({ header: '<p>ffsfsfsdfsdfsdfsdfs</p>'});
                // window.editor = newEditor;
                /*newEditor.setData({
                    content:
                        '<p><span class="title" data-id="34343" data-type="title" data-json="" data-content="UNRESOLVED">UNRESOLVED</span>&nbsp;gdgi</p><p><span class="snippet" data-id="179" data-type="snp"><span class="standardword" data-id="153" data-type="str">Minutes</span>&nbsp;of the sitting of&nbsp;<span class="variable" data-id="197" data-type="var_date" data-content="2020/1/14">2020/1/14</span></span></p><p><span class="standardword" data-id="156" data-type="str">Opening of sitting</span></p><p><span class="snippet" data-id="180" data-type="snp">The sitting opened at&nbsp;<span class="variable" data-id="157" data-type="var_time" data-content="9:11">9:11</span></span></p><p><span class="title" data-id="34343" data-type="title" data-json="{&quot;titleId&quot;:6001,&quot;isOverridden&quot;:false,&quot;templateId&quot;:&quot;1&quot;,&quot;textValue&quot;:&quot;Presentation of the programme of activities of the Croatian Presidency&quot;}" data-content="Presentation of the programme of activities of the Croatian Presidency">Presentation of the programme of activities of the Croatian Presidency</span><span class="standardword" data-id="159" data-type="str">(debate)</span></p><p><span class="snippet" data-id="186" data-type="snp"><span class="standardword" data-id="1004" data-type="str">Council and Commission statements:</span><span class="title" data-id="34343" data-type="title" data-json="{&quot;titleId&quot;:6001,&quot;isOverridden&quot;:false,&quot;templateId&quot;:&quot;2&quot;,&quot;textValue&quot;:&quot;Presentation of the programme of activities of the Croatian Presidency (2019/2959(RSP))&quot;}" data-content="Presentation of the programme of activities of the Croatian Presidency (2019/2959(RSP))">Presentation of the programme of activities of the Croatian Presidency (2019/2959(RSP))</span></span></p><p><span class="snippet" data-id="183" data-type="snp"><span class="lsp" data-id="162" data-type="var_sp" data-json="{&quot;listOfSpeakers&quot;:[{&quot;id&quot;:6,&quot;fullName&quot;:&quot;Andreij Plenkovic (President-in-Office of the Council)&quot;,&quot;hasDisplayFunction&quot;:true,&quot;hasOnBehalfOfGroup&quot;:false,&quot;isBlueCardSpeaker&quot;:false,&quot;blueCardStatus&quot;:&quot;&quot;,&quot;blueCardName&quot;:&quot;&quot;,&quot;behalfOfGroup&quot;:&quot;&quot;},{&quot;id&quot;:1,&quot;fullName&quot;:&quot;Ursula von der Leyen (President of the Cpmmission)&quot;,&quot;hasDisplayFunction&quot;:true,&quot;hasOnBehalfOfGroup&quot;:false,&quot;isBlueCardSpeaker&quot;:false,&quot;blueCardStatus&quot;:&quot;&quot;,&quot;blueCardName&quot;:&quot;&quot;,&quot;behalfOfGroup&quot;:&quot;&quot;}],&quot;isAndChecked&quot;:true,&quot;textValue&quot;:&quot;Andreij Plenkovic (President-in-Office of the Council) and Ursula von der Leyen (President of the Cpmmission)&quot;}" data-content="Andreij Plenkovic (President-in-Office of the Council) and Ursula von der Leyen (President of the Cpmmission)">Andreij Plenkovic (President-in-Office of the Council) and Ursula von der Leyen (President of the Cpmmission)</span>&nbsp;<span class="standardword" data-id="1006" data-type="str">made the statements</span></span></p><p>&nbsp;</p>',
                });*/
                /*newEditor.setData({
                    content:
                        '<p><span class="title" data-id="34343" data-viewmode="infoview" data-type="title" data-json="">UNRESOLVED</span> gdgi</p>',
                });*/

                this.editorDrop(newEditor);
                /// ///////////////////////
                //console.log('newEditor.ui.view:', newEditor.ui.view);
                const containers = newEditor.ui.view.editables;
                for (const container of containers) {
                    if (container && container.element) {
                        //container.element.addEventListener('contextmenu', this.onEditorContextMenu);
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

                newEditor.listenTo(newEditor.editing.view.document, 'dblclick', (evt, data) => {
                    const modelElement = newEditor.editing.mapper.toModelElement(data.target);
                    this.selectedEditorModelElement = modelElement;
                    console.log('dblclick data:', data);
                    console.log('dblclick data.target:', data.target);
                    console.log('dblclick modelElement:', modelElement);
                    if (
                        modelElement &&
                        modelElement.parent &&
                        modelElement.parent.name &&
                        modelElement.parent.name === 'snp'
                    ) {
                        console.log('#### dblclick if snp');
                        MultirootEditor.disableAllKeyboard(this.Editor);
                    } else {
                        console.log('#### dblclick else');
                        MultirootEditor.enableAllKeyboard(this.Editor);
                    }
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
                        console.log('#### dblclick if snp');
                        MultirootEditor.disableAllKeyboard(this.Editor);
                    } else {
                        console.log('#### dblclick else');
                        MultirootEditor.enableAllKeyboard(this.Editor);
                    }
                });

                newEditor.listenTo(
                    newEditor,
                    'change:docLanguage',
                    (evt, propertyName, newValue, oldValue) => {
                        // Do something when the data is ready.
                        newEditor.set('docLanguage', newValue);
                    }
                );
                newEditor.listenTo(
                    newEditor,
                    'change:diffbyword',
                    (evt, propertyName, newValue, oldValue) => {
                        // Do something when the data is changed.
                        console.log('#### DIFFBYWORD FROM APP');
                        this.showDiff('word');
                        //newEditor.set('docLanguage', newValue);
                    }
                );
                newEditor.listenTo(
                    newEditor,
                    'change:diffbyefficiency',
                    (evt, propertyName, newValue, oldValue) => {
                        // Do something when the data is changed.
                        console.log('#### DIFFBYWORD FROM APP');
                        this.showDiff('efficiency');
                        //newEditor.set('docLanguage', newValue);
                    }
                );

                newEditor.listenTo(
                    newEditor,
                    'change:showheaderfooter',
                    (evt, propertyName, newValue, oldValue) => {
                        // Do something when the data is changed.
                        console.log('#### SHOWHEADERFOOTER FROM APP');
                        //this.onHeaderFooter();
                        this.showHeader = !this.showHeader;
                        this.showFooter = !this.showFooter;
                        if (this.showHeader) {
                            this.contentParentHeight = '430';
                        } else {
                            this.contentParentHeight = '630';
                        }
                        //newEditor.set('docLanguage', newValue);
                    }
                );
                newEditor.listenTo(
                    newEditor,
                    'change:merge',
                    (evt, propertyName, newValue, oldValue) => {
                        // Do something when the data is changed.
                        console.log('#### MERGE FROM APP');
                        this.mergeHeaderAndFooter();
                        //newEditor.set('docLanguage', newValue);
                    }
                );

                //console.log('#### newEditor.commands:', newEditor.commands);
                //CKEditorInspector.attach(newEditor);
            })
            .catch(err => {
                console.error(err.stack);
            });
        //this.showHeader= false;
        //this.showFooter= false;
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
            this.Editor.getData({ rootName: 'header' })
        );
        console.log(
            '#### this.Editor.getData( { rootName: footer } ):',
            this.Editor.getData({ rootName: 'footer' })
        );
        const docHeader = new DOMParser().parseFromString(
            '<div>' +
            this.Editor.getData({ rootName: 'header' }).replace(/&nbsp;/gi, ' ') +
            '</div>',
            'text/xml'
        );
        const docFooter = new DOMParser().parseFromString(
            '<div>' +
            this.Editor.getData({ rootName: 'footer' }).replace(/&nbsp;/gi, ' ') +
            '</div>',
            'text/xml'
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
                valueHeader.childNodes
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
            finalHtmlString
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

    showDiff(diffType: string) {
        const modalRef = this.modalService.open(ModalShowDiffComponent, {
            size: 'xl',
        });
        const dataToModal = { original: '', updated: '', diffType: diffType };

        //const updatedParagraphs = this.contentE.nativeElement.querySelectorAll('p');
        const doc = this.documents.find(
            doc =>
                doc.language == GlobalVariables.docLanguage &&
                doc.doctype == GlobalVariables.docType
        );
        console.log('#### doc:', doc);
        const document = new DOMParser().parseFromString(unescape(doc.datacontent), 'text/html');
        console.log('#### document:', document);
        const originalParagraphs = document.documentElement.querySelectorAll('p');
        console.log('#### originalParagraphs:', originalParagraphs);
        const updatedDocument = new DOMParser().parseFromString(
            this.Editor.getData({ rootName: 'content' }),
            'text/html'
        );
        const updatedParagraphs = updatedDocument.documentElement.querySelectorAll('p, td');
        //const updatedParagraphs = this.contentE.nativeElement.querySelectorAll('p');
        /*for (const p of originalParagraphs) {
            dataToModal.original += p.textContent.concat('\r\n');
        }*/
        console.log('#### updatedParagraphs:', updatedParagraphs);
        for (let i = 0; i < originalParagraphs.length; ++i) {
            dataToModal.original += (originalParagraphs[i] && originalParagraphs[i].textContent)
                ? originalParagraphs[i].textContent.concat('\r\n')
                : ''.concat('\r\n');
        }
        for (let i = 0; i < updatedParagraphs.length; ++i) {
            dataToModal.updated += (updatedParagraphs[i] && updatedParagraphs[i].textContent)
                ? updatedParagraphs[i].textContent.concat('\r\n')
                : ''.concat('\r\n');
        }
        /*for (const p of updatedParagraphs) {
            dataToModal.updated += p.textContent.concat('\r\n');
        }*/
        console.log('dataToModal:', dataToModal);
        modalRef.componentInstance.fromParent = dataToModal;
        modalRef.result.then(result => {
            if (result) {
                console.log('#### EDITOR MODAL result:', result);
                console.log(
                    '#### EDITOR MODAL result string:',
                    result.year + '/' + result.month + '/' + result.day
                );
            }
        });
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
                        result.year + '/' + result.month + '/' + result.day
                    );
                    this.Editor.model.change(writer => {
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
            modalRef.result.then(result => {
                if (result) {
                    console.log('#### EDITOR MODAL result:', result);
                    this.Editor.model.change(writer => {
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
                        console.log('#### 1');
                        writer.setAttribute('data-content', result.textValue, modelElement);
                        console.log('#### 2');
                        writer.setAttribute('data-json', JSON.stringify(result), modelElement);
                        console.log('#### 3');
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
            const dataTargetName = data.target.name;
            console.log('#### editorDrop _myDataExtraInfo:', _myDataExtraInfo);
            console.log('#### editorDrop dataTargetName:', dataTargetName);
            console.log('#### editorDrop data:', data);

            editor.model.change(writer => {
                let parentPosition;
                if (dataTargetName === 'td' && !data.dropRange) {
                    console.log('#### dataTargetName td');
                    const tdElement = data.target;
                    const tdModelElement = editor.editing.mapper.toModelElement(tdElement);
                    parentPosition = writer.createPositionAt(tdModelElement, 0);
                    console.log('#### editorDrop parentPosition:', parentPosition);
                    //const paragraph = writer.createElement( 'paragraph' );
                    //const position = writer.createPositionAt(paragraph, 'before');
                }
                //console.log('#### editorDrop data.dropRange.start:', data.dropRange.start);
                const insertPosition2 =
                    data.dropRange && data.dropRange.start ? data.dropRange.start : parentPosition;
                console.log('#### editorDrop insertPosition2:', insertPosition2);
                const modelPosition =
                    dataTargetName === 'td' && !data.dropRange
                        ? parentPosition
                        : editor.editing.mapper.toModelPosition(insertPosition2);

                //const selection = editor.model.document.selection;

                // var currentAttributes = selection.getAttributes();
                // var parent = selection.focus.parent;
                // var insertPosition = selection.focus;
                console.log('#### editorDrop modelPosition:', modelPosition);
                //const viewFragment = editor.data.processor.toView(_myData);
                //console.log('drop viewFragment:', viewFragment);

                let viewFragment2;
                if (dataTargetName === 'td') {
                    console.log('#### IS TD');
                    viewFragment2 = editor.data.processor.toView('<p>' + _myData + '</p>');
                } else if (_myDataExtraInfo === 'span') {
                    viewFragment2 = editor.data.processor.toView('<p>' + _myData + '</p>');
                } else {
                    viewFragment2 = editor.data.processor.toView(_myData);
                }

                const modelFragment = editor.data.toModel(viewFragment2);
                console.log('#### editorDrop modelFragment:', modelFragment);
                if (dataTargetName === 'td') {
                    /*const paragraph = writer.createElement( 'paragraph' );
                    const pos = writer.createPositionAt(paragraph, 0);

                    writer.insert(modelFragment, pos);
                    writer.insert(paragraph, modelPosition);*/
                    editor.model.insertContent(modelFragment, modelPosition);
                } else if (_myDataExtraInfo === 'span') {
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

    /*onHeaderFooter() {
        this.showHeaderFooter2 = !this.showHeaderFooter2;
        if (this.showHeaderFooter2) {
            this.contentParentHeight = '430';
        } else {
            this.contentParentHeight = '630';
        }
    }*/

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
            this.selectedEditorModelElement
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
                true
            );
            const textContent = node.textContent;
            console.log('#### makeFreeText node:', node);
            console.log('#### makeFreeText node.textContent:', node.textContent);
            const finalText = textContent.replace(
                /(({var_time:[^:]*:)|(})|({var_date:[^:]*:)|(})|({var_str:[^:]*:)|(})|({str:[^:]*:)|(}))/g,
                ''
            );
            console.log('#### makeFreeText finalText:', finalText);
            this.Editor.model.change(writer => {
                writer.remove(modelElement);
                const insertPosition = this.Editor.model.document.selection.getFirstPosition();
                writer.insertText(finalText, {}, insertPosition);
            });
        }
    }

    ondragstart($event) {
        console.log('#### ondragstart $event:', $event);
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
    getDocData() {
        console.log('#### getDocData:', escape(this.Editor.getData({ rootName: 'content' })));
        console.log('#### getDocData:', this.Editor.getData({ rootName: 'content' }));
        this.getDataHtml = this.Editor.getData({ rootName: 'content' });
    }
}
