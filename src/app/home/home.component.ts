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
  productDetails: Product[] = [];
  constructor(
    private productService: ProductService,
    private imageProcessingService: ImageProcessingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllProduct();
  }

  public getAllProduct() {
    this.productService
      .getAllProducts()
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

  showProductDetails(productId: number) {
    this.router.navigate(['/productViewDetails', { productId: productId }]);
  }
}
