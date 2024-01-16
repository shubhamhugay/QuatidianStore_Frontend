// import { Component, OnInit } from '@angular/core';
// import { ProductService } from '../../_services/productService/product.service';
// import { Product } from './../../_model/Product.model';
// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { MatDialog } from '@angular/material/dialog';
// import { ShowProductImagesDialogComponent } from './../show-product-images-dialog/show-product-images-dialog.component';
// import { ImageProcessingService } from './../../_services/imageProcessingService/image-processing.service';
// import { map } from 'rxjs';

// @Component({
//   selector: 'app-show-product-details',
//   templateUrl: './show-product-details.component.html',
//   styleUrl: './show-product-details.component.css',
// })
// export class ShowProductDetailsComponent implements OnInit {
//   productDetails: Product[] = [];

//   displayedColumns: string[] = [
//     'Id',
//     'Product Name',
//     'Product Description',
//     'Product Discounted Price',
//     'Product Actual Price',
//     'Images',
//     'Edit',
//     'Delete',
//   ];
//   ngOnInit(): void {
//     this.getAllProduct();
//   }
//   constructor(
//     private productService: ProductService,
//     public imagesDialog: MatDialog,
//     private imageProcessingService: ImageProcessingService
//   ) {}

//   public getAllProduct() {
//     this.productService
//       .getAllProduct()
//       .pipe(
//         map((x: Product[], i) =>
//           x.map((product: Product) => {this.imageProcessingService.createImages(product)}))).subscribe(
//         (resp: Product[]) => {
//           console.log(resp);
//           this.productDetails = resp;
//         },
//         (error: HttpErrorResponse) => {
//           console.log(error, 'data nai fek raha bhai');
//         }
//       );
//   }
//   deleteProduct(productId: number) {
//     this.productService.deleteProduct(productId).subscribe(
//       (resp) => {
//         console.log(resp);
//         this.getAllProduct();
//       },
//       (error: HttpErrorResponse) => {
//         console.log(error, 'data nai fek raha bhai');
//       }
//     );
//   }
//   showImages(product: Product) {
//     console.log(product);
//     this.imagesDialog.open(ShowProductImagesDialogComponent, {
//       height: '500px',
//       width: '800px',
//     });
//   }
// }

import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../_services/productService/product.service';
import { Product } from './../../_model/Product.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ShowProductImagesDialogComponent } from './../show-product-images-dialog/show-product-images-dialog.component';
import { ImageProcessingService } from './../../_services/imageProcessingService/image-processing.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrls: ['./show-product-details.component.css'],
})
export class ShowProductDetailsComponent implements OnInit {
  productDetails: Product[] = [];

  displayedColumns: string[] = [
    'Id',
    'Product Name',
    'Product Description',
    'Product Discounted Price',
    'Product Actual Price',
    'Images',
    'Edit',
    'Delete',
  ];

  ngOnInit(): void {
    this.getAllProduct();
  }

  constructor(
    private productService: ProductService,
    public imagesDialog: MatDialog,
    private imageProcessingService: ImageProcessingService
  ) {}

  public getAllProduct() {
    this.productService
      .getAllProduct()
      .pipe(
        map((x: Product[]) => {
          return x.map((product: Product) =>
            this.imageProcessingService.createImages(product)
          );
        })
      )
      .subscribe(
        (resp: Product[]) => {
          console.log(resp);
          this.productDetails = resp;
        },
        (error: HttpErrorResponse) => {
          console.log(error, 'data nai fek raha bhai');
        }
      );
  }

  deleteProduct(productId: number) {
    this.productService.deleteProduct(productId).subscribe(
      (resp) => {
        console.log(resp);
        this.getAllProduct();
      },
      (error: HttpErrorResponse) => {
        console.log(error, 'data nai fek raha bhai');
      }
    );
  }

  showImages(product: Product) {
    console.log(product);
    this.imagesDialog.open(ShowProductImagesDialogComponent, {
      data: {
        images: product.productImages,
      },
      height: '500px',
      width: '800px',
    });
  }
}
