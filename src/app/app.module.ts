import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MultirootEditorComponent } from './multiroot-editor/multiroot-editor.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EditorSidebarComponent } from './editor-sidebar/editor-sidebar.component';
import { FilterPipe } from './filter.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MultirootEditorComponent,
    EditorSidebarComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    CKEditorModule,
    FontAwesomeModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
