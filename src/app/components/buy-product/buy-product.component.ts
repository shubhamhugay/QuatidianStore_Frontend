import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderDetails } from '../../_model/order-details.models';

import { Product } from './../../_model/Product.model';
import { ProductService } from './../../_services/productService/product.service';

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrl: './buy-product.component.css',
})
export class BuyProductComponent implements OnInit {
  productDetails: Product[] = [];
  isSingleProductCheckout: string = '';

  orderDetails: OrderDetails = {
    fullName: '',
    fullAddress: '',
    contactNumber: '',
    alternateContactNumber: '',
    orderProductQuantityList: [],
  };
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productDetails = this.activatedRoute.snapshot.data['productDetails'];
    this.isSingleProductCheckout =
      this.activatedRoute.snapshot.paramMap.get('isSingleProductCheckout') ||
      '';

    this.productDetails.forEach((x) =>
      this.orderDetails.orderProductQuantityList.push({
        productId: x.productId,
        quantity: 1,
      })
    );

    console.log(this.productDetails);
    console.log(this.orderDetails);
  }
  public placeOrder(orderForm: NgForm) {
    this.productService
      .placeOrder(this.orderDetails, this.isSingleProductCheckout)
      .subscribe(
        (resp) => {
          console.log(resp);
          orderForm.reset();
          this.router.navigate(['/orderConfirm']);
        },
        (err) => {
          console.error(err);
        }
      );
  }

  getQuantityForProduct(productId: any) {
    const filteredProduct = this.orderDetails.orderProductQuantityList.filter(
      (product) => product.productId === productId
    );
    return filteredProduct[0].quantity;
  }

  getCalculatedTotal(productId: any, productDiscountedPrice: any) {
    const filteredProduct = this.orderDetails.orderProductQuantityList.filter(
      (product) => product.productId === productId
    );
    return filteredProduct[0].quantity * productDiscountedPrice;
  }

  onQuantityChanged(q: any, productId: any) {
    this.orderDetails.orderProductQuantityList.filter(
      (order) => order.productId === productId
    )[0].quantity = q;
  }

  getCalculatedGrandTotal() {
    let grandTotal = 0;
    this.orderDetails.orderProductQuantityList.forEach((productQuantity) => {
      const price = this.productDetails.filter(
        (product) => product.productId === productQuantity.productId
      )[0].productDiscountedPrice;
      grandTotal = grandTotal + price * productQuantity.quantity;
    });
    return grandTotal;
  }
}
