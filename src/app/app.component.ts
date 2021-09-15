import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
// import * as ClassicEditor from 'src/ckeditor.js';
import * as ClassicEditor from 'src/app/aiCkEditor/build/ckeditor.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'med-editor';
  Editor = ClassicEditor;
  selectedText: string = ''
  editorLines: string[] = ["Hello, world!"]

  @ViewChild( 'editor' ) editorComponent: ElementRef;

  @HostListener('window: CustomDropdown', ['$event'])
  onCustomDropdown(e: any) {
    if (this.selectedText) {
      console.log('this text will going to backend --->       ', this.selectedText)
      this.selectedText = '';
    }
  }

  @HostListener('window: textSelectionDone', ['$event'])
  onTextSelection(e: any) {
    let computedText = [];
    
    for (let i = e.selectedText.text.start[0]; i <= e.selectedText.text.end[0]; i++) {
      if (i == e.selectedText.text.start[0] && i == e.selectedText.text.end[0]) {
        computedText.push(this.editorLines[i].substring(e.selectedText.text.start[1], e.selectedText.text.end[1]))
      } else if (i == e.selectedText.text.start[0]) {
        computedText.push(this.editorLines[i].substring(e.selectedText.text.start[1], this.editorLines[i].length))
      } else if (i == e.selectedText.text.end[0]) {
        computedText.push(this.editorLines[i].substring(0, e.selectedText.text.end[1]))
      }
      else {
        computedText.push(this.editorLines[i])
      }
    }
    this.selectedText = computedText.join(' ');
    
  }

  ngAfterViewInit() {
  }

  ngOnInit() {
  }

  public onChange( { editor }: ChangeEvent ) {
    const data = editor.getData();
    this.editorLines = data.split('p><p>').map(el => {
      return el.replace(/<[^>]*>?/gm, '')
    });
  }
}
