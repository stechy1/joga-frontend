import { Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToolbarButton } from './editor-toolbar/toolbar-button';
import {
  BUTTON_BOLD, BUTTON_ITALIC, BUTTON_UNDERLINE,
  BUTTON_HIGHLIGHT,
  BUTTON_LINK, BUTTON_ORDERED_LIST, BUTTON_QUOTES,
  BUTTON_SMALL,
  BUTTON_STRIKETHROUGH,
  BUTTON_UNORDERED_LIST, BUTTON_HEADINGS, buttonForImage, buttonForPreview
} from './editor-toolbar/toolbar-buttons';
import { MarkdownService } from './markdown.service';
import { BehaviorSubject } from 'rxjs';
import { ModalComponent } from '../modal/modal.component';
import { FileBrowserComponent } from '../file-browser/file-browser.component';
import { FileRecord } from '../file-browser/file-record';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessorBase } from '../value-accessor-base';

@Component({
  selector: 'app-markdown-editor',
  templateUrl: './markdown-editor.component.html',
  styleUrls: ['./markdown-editor.component.css'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: MarkdownEditorComponent, multi: true}
  ]
})
export class MarkdownEditorComponent extends ValueAccessorBase<string> implements OnInit {

  @ViewChild('modal', {static: true}) modal: ModalComponent;
  @ViewChild('textarea', {static: true}) textarea: ElementRef;

  showPreview: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  buttons: ToolbarButton[];
  htmlPreview: string;

  constructor(private _service: MarkdownService) {
    super();

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
      buttonForImage(() => this._handleShowFileExplorer()),
      buttonForPreview(() => this._handleShowPreview())
    ];
  }

  ngOnInit() {
    this.showPreview.subscribe((showPreview: boolean) => {
      if (showPreview) {
        this._service.encode(this.value)
            .then(html => {
              this.htmlPreview = html;
            });
      }
    });
  }

  handleToolbarButtonClick(button: ToolbarButton) {
    if (!button.onClick()) {
      return;
    }

    this._insertContent(button);
  }

  private _insertContent(button: { before?: string, after?: string, space?: number }) {
    const textArea = ((this.textarea.nativeElement) as HTMLTextAreaElement);
    const selectionStart = textArea.selectionStart;
    const selectionEnd = textArea.selectionEnd;
    const selectedText = this.value.substr(selectionStart, selectionEnd - selectionStart);
    const originalText = this.value;

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
        const part3 = originalText.substr(selectionStart + selectedText.length + ((button.after) ? button.after.length : 0));
        // Obsah je spojení těchto tří řetězců
        this.value = part1 + part2 + part3;
      } else {
        this.value =
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

    this.value =
      originalText.substr(0, selectionStart) +
      button.before +
      selectedText +
      button.after +
      originalText.substr(selectionEnd);
    textArea.focus();

    const newCursorPos = selectionEnd + ((button.after) ? button.after.length : 0) + (button.space || 0);
    textArea.setSelectionRange(newCursorPos, newCursorPos);
  }

  private _handleShowPreview(): boolean {
    this.showPreview.next(!this.showPreview.getValue());
    return false;
  }

  private _handleShowFileExplorer(): boolean {
    this.modal.showComponent = FileBrowserComponent;
    this.modal.openForResult()
        .then((file: FileRecord) => {
          this._insertContent({
            before: `![${file.name}`,
            after: `](public/uploads/user/${file.path})`
          });
        })
        .catch(() => {
          // Dialog was closed
        });
    return false;
  }
}
