/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// The editor creator to use.
import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import UploadAdapter from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';
import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import Indent from '@ckeditor/ckeditor5-indent/src/indent';
import Link from '@ckeditor/ckeditor5-link/src/link';
import List from '@ckeditor/ckeditor5-list/src/list';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import TextTransformation from '@ckeditor/ckeditor5-typing/src/texttransformation';
import CloudServices from '@ckeditor/ckeditor5-cloud-services/src/cloudservices';
import BalloonToolbar from '@ckeditor/ckeditor5-ui/src/toolbar/balloon/balloontoolbar';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import Model from '@ckeditor/ckeditor5-ui/src/model';
import WordCount from '@ckeditor/ckeditor5-word-count/src/wordcount';

import { createDropdown, addListToDropdown } from '@ckeditor/ckeditor5-ui/src/dropdown/utils';
import Collection from '@ckeditor/ckeditor5-utils/src/collection';

export class CustomDropdowm extends Plugin {
    
    static get pluginName() {
        return 'CustomDropdowm';
    }
    
    init() {
        const editor = this.editor;
        const t = editor.t;

        editor.ui.componentFactory.add('customDropdowm', locale => {

            const dropdownView = createDropdown( locale );

            dropdownView.buttonView.set({
				label: 'AI Shortcuts',
			});
            dropdownView.extendTemplate( {
				attributes: {
					class: [
						'ck ck-button ck-button_with-text ck-dropdown__button'
					]
				}
			});

            const items = new Collection();

            items.add( {
                type: 'button',
                model: new Model( {
                    label: 'Write about this'
                })
            });
			items.add( {
                type: 'button',
                model: new Model( {
                    label: 'Paraphrase'
                })
            });
			items.add( {
                type: 'button',
                model: new Model( {
                    label: 'Find Topics'
                })
            });
			items.add( {
                type: 'button',
                model: new Model( {
                    label: 'Find Passages'
                })
            });

            addListToDropdown( dropdownView, items );

			dropdownView.on('execute', (eventInfo) => {
				let event = new CustomEvent("CustomDropdown");
				event.selectedText = { text: eventInfo.source.label.split(' ').join('_').toLowerCase() };
				window.dispatchEvent(event);
			});
			

            return dropdownView;
        });
    }
}

export class TextSelection extends Plugin {
	static get pluginName() {
		return 'TextSelection';
	}

	init() {
		const editor = this.editor;

		editor.model.document.selection.on("change:range", (data) => {
			if (JSON.stringify(data.source._ranges[0].end.path) !== JSON.stringify(data.source._ranges[0].start.path)) {
				let event = new CustomEvent("textSelectionDone");
				event.selectedText = { text: {end: data.source._ranges[0].end.path, start: data.source._ranges[0].start.path} };
				window.dispatchEvent(event);
			}
		});
	}
}

export class TotalWords extends Plugin {
	static get pluginName() {
		return 'TotalWords';
	}

	init() {
		const editor = this.editor;

		editor.model.document.on( 'change:data', (evt, data) => {
			// console.log(evt, data)
		});

		// editor.editing.view.document.on('selectionChangeDone', (evt, data) => {
		// 	if (evt.source.selection._selection._ranges[0].end.offset != evt.source.selection._selection._ranges[0].start.offset) {
		// 		let event = new CustomEvent("textSelectionDone");
		// 		event.selectedText = { text: data.domSelection.focusNode.data.substring(evt.source.selection._selection._ranges[0].start.offset, evt.source.selection._selection._ranges[0].end.offset) };
		// 		window.dispatchEvent(event);
		// 	}
		// });
	}
}

export default class ClassicEditor extends ClassicEditorBase {}

// Plugins to include in the build.
ClassicEditor.builtinPlugins = [
	Essentials,
	UploadAdapter,
	Autoformat,
	Bold,
	Italic,
	BlockQuote,
	CKFinder,
	CloudServices,
	EasyImage,
	Heading,
	Image,
	ImageCaption,
	ImageStyle,
	ImageToolbar,
	ImageUpload,
	Indent,
	Link,
	List,
	MediaEmbed,
	Paragraph,
	PasteFromOffice,
	Table,
	TableToolbar,
	TextTransformation,
	BalloonToolbar,
	CustomDropdowm,
	TextSelection,
	WordCount,
	TotalWords
];

// Editor configuration.
ClassicEditor.defaultConfig = {
	toolbar: {
		items: [
			"indent",
			"outdent",
			"|",
			'heading',
			"|",
			'bulletedList',
			'numberedList',
			'|',
			"insertTable",
			"mediaEmbed",
			'|',
			'customDropdowm',
		]
	},
	balloonToolbar: {
		items: [
			'bold',
			'|',
			'customDropdowm'
		]
	},
	image: {
		toolbar: [
			'imageStyle:inline',
			'imageStyle:block',
			'imageStyle:side',
			'|',
			'toggleImageCaption',
			'imageTextAlternative'
		]
	},
	table: {
		contentToolbar: [
			'tableColumn',
			'tableRow',
			'mergeTableCells'
		]
	},
	// This value must be kept in sync with the language defined in webpack.config.js.
	language: 'en'
};
