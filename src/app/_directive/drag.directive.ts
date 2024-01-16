// import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';
// import { DomSanitizer } from '@angular/platform-browser';
// import { FileHandle } from '../_model/file-handle.model';

// @Directive({
//   selector: '[appDrag]',
// })
// export class DragDirective {
//   @Output() files: EventEmitter<FileHandle>=new EventEmitter();

//   @HostBinding('style.background') private background = '#eee';

//   constructor(private sanitizer: DomSanitizer) {}

//   //working
//   @HostListener('dragover', ['$event'])
//   public onDragOver(evt: DragEvent) {
//     evt.preventDefault();
//     evt.stopPropagation();
//     this.background = '#999';
//   }

//   //working
//   @HostListener('dragleave', ['$event'])
//   public onDragLeave(evt: DragEvent) {
//     evt.preventDefault();
//     evt.stopPropagation();
//     this.background = '#eee';
//   }

//   @HostListener('drop', ['$event'])
//   public onDrop(evt: DragEvent) {
//     evt.preventDefault();
//     evt.stopPropagation();
//     this.background = '#eee';

//     let fileHandle: FileHandle = null;

//     const file = evt.dataTransfer.files[0];
//     const url = this.sanitizer.bypassSecurityTrustUrl(
//       window.URL.createObjectURL(file)

//     fileHandle = { file, url };
//     this.files.emit(fileHandle);
//   }
// }
// import {
//   Directive,
//   EventEmitter,
//   HostBinding,
//   HostListener,
//   Output,
// } from '@angular/core';
// import { DomSanitizer } from '@angular/platform-browser';
// import { FileHandle } from '../_model/file-handle.model';

// @Directive({
//   selector: '[appDrag]',
// })
// export class DragDirective {
//   @Output() files: EventEmitter<FileHandle> = new EventEmitter();
//   @HostBinding('style.background') private background = '#eee';

//   constructor(private sanitizer: DomSanitizer) {}

//   @HostListener('dragover', ['$event'])
//   public onDragOver(evt: DragEvent) {
//     evt.preventDefault();
//     evt.stopPropagation();
//     this.background = '#999';
//   }

//   @HostListener('dragleave', ['$event'])
//   public onDragLeave(evt: DragEvent) {
//     evt.preventDefault();
//     evt.stopPropagation();
//     this.background = '#eee';
//   }

//   @HostListener('drop', ['$event'])
//   public onDrop(evt: DragEvent) {
//     evt.preventDefault();
//     evt.stopPropagation();
//     this.background = '#eee';

//     let fileHandle: FileHandle = { file: null, url: null };

//     if (
//       evt.dataTransfer &&
//       evt.dataTransfer.files &&
//       evt.dataTransfer.files.length > 0
//     ) {
//       const file = evt.dataTransfer.files[0];
//       const url = this.sanitizer.bypassSecurityTrustUrl(
//         window.URL.createObjectURL(file)
//       );
//       fileHandle = { file, url };
//     }

//     this.files.emit(fileHandle);
//   }
// }

import {
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Output,
} from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FileHandle } from '../_model/file-handle.model';

@Directive({
  selector: '[appDrag]',
})
export class DragDirective {
  @Output() files: EventEmitter<FileHandle> = new EventEmitter();

  @HostBinding('style.background') private background = '#eee';

  constructor(private sanitizer: DomSanitizer) {}

  // Working
  @HostListener('dragover', ['$event'])
  public onDragOver(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#999';
  }

  // Working
  @HostListener('dragleave', ['$event'])
  public onDragLeave(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#eee';
  }

  @HostListener('drop', ['$event'])
  public onDrop(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#eee';

    let fileHandle: FileHandle;

    if (evt.dataTransfer && evt.dataTransfer.files.length > 0) {
      const file = evt.dataTransfer.files[0];
      const url: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(
        window.URL.createObjectURL(file)
      );

      fileHandle = { file, url };
      this.files.emit(fileHandle);
    }
  }
}
