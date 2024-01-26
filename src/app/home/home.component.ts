import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Product } from '../_model/Product.model';
import { ProductService } from './../_services/productService/product.service';
import { ImageProcessingService } from './../_services/imageProcessingService/image-processing.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  pageNumber: number = 0;
  showLoadButton = false;
  productDetails: Product[] = [];
  constructor(
    private productService: ProductService,
    private imageProcessingService: ImageProcessingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllProduct();
  }

  public getAllProduct(searchkey: string = '') {
    this.productService
      .getAllProducts(this.pageNumber, searchkey)
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
          if (resp.length == 12) {
            this.showLoadButton = true;
          } else {
            this.showLoadButton = false;
          }
          resp.forEach((p) => this.productDetails.push(p));
        },
        (error: HttpErrorResponse) => {
          console.log(error, 'data nai fek raha bhai');
        }
      );
  }

  showProductDetails(productId: number) {
    this.router.navigate(['/productViewDetails', { productId: productId }]);
  }

  public loadMoreProduct() {
    this.pageNumber = this.pageNumber + 1;
    this.getAllProduct();
  }

  searchByKeyword(searchKeyword: any) {
    this.pageNumber = 0;
    this.productDetails = [];
    this.getAllProduct(searchKeyword);
  }
}
