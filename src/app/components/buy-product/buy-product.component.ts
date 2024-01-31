import { Component, Injector, NgZone, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// import Razorpay from 'razorpay';

import { OrderDetails } from '../../_model/order-details.models';

import { Product } from './../../_model/Product.model';
import { ProductService } from './../../_services/productService/product.service';

declare var Razorpay: any;

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
    transactionId: '',
    orderProductQuantityList: [],
  };
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private injector: Injector
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
  }
  public placeOrder(orderForm: NgForm) {
    this.productService
      .placeOrder(this.orderDetails, this.isSingleProductCheckout)
      .subscribe(
        (resp) => {
          console.log(resp);
          orderForm.reset();

          const ngZone = this.injector.get(NgZone);
          ngZone.run(() => {
            this.router.navigate(['/orderConfirm']);
          });

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
  createTransactionAndPlaceOrder(orderForm: NgForm) {
    let amount = this.getCalculatedGrandTotal();
    this.productService.createTransaction(amount).subscribe(
      (response) => {
        console.log(response);
        this.openTransactionModal(response, orderForm);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  openTransactionModal(response: any, orderForm: NgForm) {
    var options = {
      order_id: response.orderId,
      key_id: response.key,
      amount: response.amount,
      currency: response.currency,
      name: 'roger the developer',
      description: 'asach timepass',
      image:
        'https://cdn.pixabay.com/photo/2017/04/15/16/59/skeleton-2232884_1280.jpg',
      handler: (response: any) => {
        console.log(response);
        if (response != null && response.razorpay_payment_id != null) {
          this.processResponse(response, orderForm);
        } else {
          alert('payment failed.................');
        }
      },
      prefill: {
        name: 'roger',
        email: 'roger@gmail.com',
        contact: '7020976150',
      },
      notes: {
        address: 'Online Shopping',
      },
      theme: {
        color: '#F37254',
      },
    };
    var razorPayObject = new Razorpay(options);
    razorPayObject.open();
  }

  processResponse(resp: any, orderForm: NgForm) {
    this.orderDetails.transactionId = resp.razorpay_payment_id;
    this.placeOrder(orderForm);
  }
}
