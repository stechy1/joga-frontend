import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ToolbarButton } from './editor-toolbar/toolbar-button';
import {
  BUTTON_BOLD, BUTTON_ITALIC, BUTTON_UNDERLINE,
  BUTTON_HIGHLIGHT, BUTTON_IMAGE,
  BUTTON_LINK, BUTTON_ORDERED_LIST, BUTTON_PREVIEW, BUTTON_QUOTES,
  BUTTON_SMALL,
  BUTTON_STRIKETHROUGH,
  BUTTON_UNORDERED_LIST, BUTTON_HEADINGS
} from './editor-toolbar/toolbar-buttons';
import { MarkdownService } from './markdown.service';
import { BehaviorSubject } from 'rxjs';
import { ModalComponent } from '../modal/modal.component';
import { FileBrowserComponent } from '../file-browser/file-browser.component';

@Component({
  selector: 'app-markdown-editor',
  templateUrl: './markdown-editor.component.html',
  styleUrls: ['./markdown-editor.component.css']
})
export class MarkdownEditorComponent implements OnInit {

  @ViewChild('modal', {static: true}) modal: ModalComponent;
  @ViewChild('textarea', {static: true}) textarea: ElementRef;

  showPreview: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  @Input() content = '';
  buttons: ToolbarButton[];
  htmlPreview: string;

  constructor(private _service: MarkdownService) {
    const btnImage = {...BUTTON_IMAGE};
    btnImage.onClick = () => this._handleShowFileExplorer();
    const btnPreview = {...BUTTON_PREVIEW};
    btnPreview.onClick = () => this._handleShowPreview();

    this.buttons = [
      ...BUTTON_HEADINGS,
      BUTTON_BOLD,
      BUTTON_ITALIC,
      // BUTTON_UNDERLINE,
      BUTTON_STRIKETHROUGH,
      // BUTTON_HIGHLIGHT,
      // BUTTON_SMALL,
      BUTTON_QUOTES,
      BUTTON_ORDERED_LIST,
      BUTTON_UNORDERED_LIST,
      BUTTON_LINK,
      btnImage,
      btnPreview
    ];
  }

  ngOnInit() {
    this.showPreview.subscribe((showPreview: boolean) => {
      if (showPreview) {
        this._service.encode(this.content)
            .then(html => {
              this.htmlPreview = html;
            });
      }
    });
  }

  private _handleShowPreview(): boolean {
    this.showPreview.next(!this.showPreview.getValue());
    return false;
  }

  private _handleShowFileExplorer(): boolean {
    this.modal.showComponent = FileBrowserComponent;
    this.modal.open();
    return false;
  }

  handleToolbarButtonClick(button: ToolbarButton) {
    if (!button.onClick()) {
      return;
    }

    const textArea = ((this.textarea.nativeElement) as HTMLTextAreaElement);
    const selectionStart = textArea.selectionStart;
    const selectionEnd = textArea.selectionEnd;
    const selectedText = this.content.substr(selectionStart, selectionEnd - selectionStart);
    const originalText = this.content;

    // Mám vybraný text
    if (selectedText) {
      // Virtuálně získám ještě obalovací značky kolem textu
      const markedText = originalText.substr(
        selectionStart - ((button.before) ? button.before.length : 0),
        ((button.before) ? button.before.length : 0) + selectedText.length + ((button.after) ? button.after.length : 0));

      // Pokud už je text obalený značkami, které odpovídají mému tlačítku
      if (markedText.startsWith(button.before) && markedText.endsWith(button.after)) {
        // Získám text před značkou
        const part1 = originalText.substr(0, selectionStart - ((button.before) ? button.before.length : 0));
        // Získám samotný označený text
        const part2 = selectedText;
        // Získám text až za značkou
        const part3 = originalText.substr(selectionStart + selectedText.length + ((button.after) ? button.after.length : 0) );
        // Obsah je spojení těchto tří řetězců
        this.content = part1 + part2 + part3;
      } else {
        this.content =
          originalText.substr(0, selectionStart) +
          button.before +
          selectedText +
          button.after +
          originalText.substr(selectionEnd);
      }

      const newCursorPosStart = selectionStart + ((button.before) ? button.before.length : 0);
      const newCursorPosEnd = selectionEnd + ((button.after) ? button.after.length : 0) + (button.space || 0);
      textArea.setSelectionRange(newCursorPosStart, newCursorPosEnd);

      return;
    }

    this.content =
      originalText.substr(0, selectionStart) +
      button.before +
      selectedText +
      button.after +
      originalText.substr(selectionEnd);
    textArea.focus();

    const newCursorPos = selectionEnd + ((button.after) ? button.after.length : 0) + (button.space || 0);
    textArea.setSelectionRange(newCursorPos, newCursorPos);
  }
}
