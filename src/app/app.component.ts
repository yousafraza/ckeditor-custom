import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import * as ClassicEditor from 'src/ckeditor.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'med-editor';
  Editor = ClassicEditor;
  selectedText: string;

  @ViewChild( 'editor' ) editorComponent: ElementRef;

  @HostListener('window: CustomDropdown', ['$event'])
  onWriteAbout(e: any) {
    if (this.selectedText) {
      console.log(this.selectedText)
    }
  }

  @HostListener('window: textSelectionDone', ['$event'])
  onTextSelection(e: any) {
    this.selectedText = e.selectedText.text;
  }

  ngAfterViewInit() {
  }

  ngOnInit() {
    // this.Editor.builtinPlugins.map( plugin => console.log(plugin.pluginName));
    // console.log('--------------------------------------------------------');
    
    // this.Editor.builtinPlugins.map( plugin => console.log(plugin.pluginName));
    // console.log(window)
    // this.gw.tinyMCE.init({
    //     selector: '#mytextarea'
    //   })
    // const editor = Jodit.make('#editor');
    // editor.value = '<p>start</p>';

    // tinymce.init({
    //   selector: 'textarea#full-featured-non-premium',
    //     toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
    //     toolbar_sticky: true
    // });

    // tinymce.init({
    //   selector: 'textarea#full-featured-non-premium',
    //   toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
    //   toolbar_sticky: true
    //  });

    // tinymce.init({
    //   selector: '#mytextarea'
    // });
  }

  public onChange( { editor }: ChangeEvent ) {
    const data = editor.getData();
    console.log( data );
}
}
