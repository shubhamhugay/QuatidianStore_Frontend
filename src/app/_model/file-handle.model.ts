import { SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

export interface FileHandle {
  file: File;
  url: SafeResourceUrl;
}
