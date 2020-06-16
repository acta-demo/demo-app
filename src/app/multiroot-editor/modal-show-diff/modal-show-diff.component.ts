import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import DiffMatchPatch from 'diff-match-patch';
//import 'diff-match-patch-line-and-word';

@Component({
    selector: 'app-modal-show-diff',
    templateUrl: './modal-show-diff.component.html',
    styleUrls: ['./modal-show-diff.component.css'],
})
export class ModalShowDiffComponent implements OnInit {
    @Input() fromParent;
    strSelected: string | null = null;
    faWindowClose = faWindowClose;
    dmp: DiffMatchPatch = new DiffMatchPatch();
    html_diffs: any;
    html_diffs_reverse: any;
    differenceType: string;

    constructor(public activeModal: NgbActiveModal) {}

    ngOnInit() {
        console.log(this.fromParent);
        const valueFooter: string = this.fromParent.original;
        const valueHeader: string = this.fromParent.updated;
        const diffType: string = this.fromParent.diffType;
        this.differenceType = diffType;
        console.log('#### valueFooter:', valueFooter);
        if (valueFooter && valueHeader) {
            if (diffType === 'word') {
                //diffByWord const diffs = this.dmp.diff_wordMode(valueFooter, valueHeader);
                const diffs = this.diffByWord(valueFooter, valueHeader);
                console.log('#### diffs:', diffs);
                this.html_diffs = this.dmp.diff_prettyHtml(diffs);

                const diffs_reverse = this.diffByWord(valueFooter, valueFooter);
                this.html_diffs_reverse = this.dmp.diff_prettyHtml(diffs_reverse);
            } else if (diffType === 'efficiency') {
                const diffs = this.dmp.diff_main(valueFooter, valueHeader);
                this.dmp.diff_cleanupEfficiency(diffs);
                console.log('#### diffs:', diffs);
                this.html_diffs = this.dmp.diff_prettyHtml(diffs);

                const diffs_reverse = this.dmp.diff_main(valueFooter, valueFooter);
                this.dmp.diff_cleanupEfficiency(diffs_reverse);
                this.html_diffs_reverse = this.dmp.diff_prettyHtml(diffs_reverse);
            }
            console.log('#### diff_prettyHtml(diffs) ? html:', this.html_diffs);
        }
    }

    indexOfWordBoundary(target, startIndex) {
        const n = target.length;
        for (let i = startIndex; i < n; i += 1) {
            if (/\W/.test(target[i])) {
                return i;
            }
        }
        return -1;
    }

    tokenize(text, indexOfWordBoundary_, callback) {
        let wordStart = 0;
        let wordEnd = -1;
        while (wordEnd < text.length - 1) {
            wordEnd = indexOfWordBoundary_(text, wordStart);
            if (wordEnd !== -1) {
                if (wordStart !== wordEnd) {
                    const word = text.substring(wordStart, wordEnd);
                    callback(word);
                }
                const punct = text[wordEnd];
                callback(punct);
                wordStart = wordEnd + 1;
            } else {
                const word = text.substring(wordStart, text.length);
                callback(word);
                wordEnd = text.length;
                break;
            }
        }
    }

    diffByWord(text1, text2) {
        const _a = this.diff_wordsToChars_(text1, text2),
            chars1 = _a.chars1,
            chars2 = _a.chars2,
            lineArray = _a.lineArray;
        const diffs = this.dmp.diff_main(chars1, chars2, false);
        this.dmp.diff_charsToLines_(diffs, lineArray);
        return diffs;
    }

    diff_wordsToChars_(text1, text2) {
        const wordArray = [];
        const wordHash = {};
        wordArray[0] = '';
        const tokenize_ = this.tokenize;
        const indexOfWordBoundary_ = this.indexOfWordBoundary;

        const diff_linesToWordsMunge_ = function (text) {
            let chars = '';
            let wordArrayLength = wordArray.length;
            tokenize_(text, indexOfWordBoundary_, function (word) {
                if (
                    wordHash.hasOwnProperty
                        ? wordHash.hasOwnProperty(word)
                        : wordHash[word] !== undefined
                ) {
                    chars += String.fromCharCode(wordHash[word]);
                } else {
                    chars += String.fromCharCode(wordArrayLength);
                    wordHash[word] = wordArrayLength;

                    wordArray[wordArrayLength++] = word;
                }
            });
            return chars;
        };
        const chars1 = diff_linesToWordsMunge_(text1);
        const chars2 = diff_linesToWordsMunge_(text2);
        return { chars1: chars1, chars2: chars2, lineArray: wordArray };
    }

    closeModal(sendStatus) {
        console.log('#### strSelected:', this.strSelected);
        if (sendStatus === 'save' && this.strSelected.trim() === '') {
            this.strSelected = 'UNRESOLVED';
        }
        const sendDataToEditor = sendStatus === 'save' ? this.strSelected : undefined;
        this.activeModal.close(sendDataToEditor);
    }
}
