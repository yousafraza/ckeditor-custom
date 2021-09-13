import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
// import { QuillModule } from 'ngx-quill';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    EditorModule,
    CKEditorModule,
    // QuillModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
