import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-show-product-images-dialog',
  templateUrl: './show-product-images-dialog.component.html',
  styleUrl: './show-product-images-dialog.component.css',
})
export class ShowProductImagesDialogComponent implements OnInit {
  ngOnInit(): void {}

  constructor(@Inject(MAT_DIALOG_DATA) public data1: DialogData) {}
}
