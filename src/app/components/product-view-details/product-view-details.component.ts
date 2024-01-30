import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from './../../_model/Product.model';
import { ProductService } from './../../_services/productService/product.service';

@Component({
  selector: 'app-product-view-details',
  templateUrl: './product-view-details.component.html',
  styleUrl: './product-view-details.component.css',
})
export class ProductViewDetailsComponent implements OnInit {
  selectedProductIndex = 0;
  product: Product | any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.product = this.activatedRoute.snapshot.data['product'];
    console.log(this.product);
  }

  changeIndex(i: number) {
    this.selectedProductIndex = i;
  }

  buyProduct(productId: number) {
    this.router.navigate([
      '/buyProduct',
      {
        isSingleProductCheckout: true,
        id: productId,
      },
    ]);
  }

  addToCart(productId: any) {
    this.productService.addToCart(productId).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
