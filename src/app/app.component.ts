import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as ClassicEditor from 'src/ckeditor.js';
// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import BalloonToolbar from '@ckeditor/ckeditor5-ui/src/toolbar/balloon/balloontoolbar';
// import * as BaloonEditor from '@ckeditor/ckeditor5-build-balloon';
// import tinymce from 'tinymce';
// import tim

// import {Jodit} from 'jodit';

// declare var tinymce: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'med-editor';
  Editor = ClassicEditor;

  ngOnInit() {
  
  }
}
