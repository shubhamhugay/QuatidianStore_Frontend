import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from './../../_services/productService/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  displayedColumns: string[] = [
    'Name',
    'Description',
    'Price',
    'Discounted Price',
    'Action',
  ];
  cartDetails = [];
  constructor(private productService: ProductService, private router: Router) {}
  ngOnInit(): void {
    this.getCartDetails();
  }

  getCartDetails() {
    this.productService.getCartDetails().subscribe(
      (response: any) => {
        console.log(response);
        this.cartDetails = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  checkout() {
    this.router.navigate([
      '/buyProduct',
      {
        isSingleProductCheckout: false,
        id: 0,
      },
    ]);
  }
  delete(cartID: any) {
    this.productService.deleteCartItem(cartID).subscribe(
      (response) => {
        console.log(response);
        this.getCartDetails();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // this.productService.getProductDetails(false, 0).subscribe(
  //   (resp) => {

  //   },
  //   (err) => {
  //     console.log(err);
  //   }
  // );
}
