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



@NgModule({
  declarations: [
    AppComponent,
    MultirootEditorComponent,
    StwordSidebarComponent,
    FilterPipe,
    SnippetSidebarComponent,
    SafeHtmlPipe
  ],
  imports: [
    BrowserModule,
    CKEditorModule,
    FontAwesomeModule,
    FormsModule,
    DragDropModule,
    BrowserAnimationsModule,
    MatMenuModule,
    ContextMenuModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
