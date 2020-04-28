import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MultirootEditorComponent } from './multiroot-editor/multiroot-editor.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StwordSidebarComponent } from './stword-sidebar/stword-sidebar.component';
import { FilterPipe } from './filter.pipe';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material';
import { ContextMenuModule } from 'ngx-contextmenu';
import { SnippetSidebarComponent, SafeHtmlPipe } from './snippet-sidebar/snippet-sidebar.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ModalDatePickerComponent } from './multiroot-editor/modal-date-picker/modal-date-picker.component';
import { ModalTimePickerComponent } from './multiroot-editor/modal-time-picker/modal-time-picker.component';
import { ModalStringPickerComponent } from './multiroot-editor/modal-string-picker/modal-string-picker.component';
import { ModalListOfSpeakersComponent } from './multiroot-editor/modal-list-of-speakers/modal-list-of-speakers.component';



@NgModule({
  declarations: [
    AppComponent,
    MultirootEditorComponent,
    StwordSidebarComponent,
    FilterPipe,
    SnippetSidebarComponent,
    SafeHtmlPipe,
    ModalDatePickerComponent,
    ModalTimePickerComponent,
    ModalStringPickerComponent,
    ModalListOfSpeakersComponent
  ],
  imports: [
    BrowserModule,
    CKEditorModule,
    FontAwesomeModule,
    FormsModule,
    DragDropModule,
    BrowserAnimationsModule,
    MatMenuModule,
    ContextMenuModule.forRoot(),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [
   ModalDatePickerComponent,
   ModalTimePickerComponent,
   ModalStringPickerComponent,
   ModalListOfSpeakersComponent
]
})
export class AppModule { }
