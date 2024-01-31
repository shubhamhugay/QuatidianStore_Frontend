import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MyOrderDetails } from '../../_model/order.model';
import { Product } from '../../_model/Product.model';
import { OrderDetails } from './../../_model/order-details.models';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  public deleteCartItem(cartID: any) {
    return this.httpClient.delete(
      'http://localhost:9090/deleteCartItem/' + cartID
    );
  }

  public addProduct(product: FormData) {
    return this.httpClient.post<Product>(
      'http://localhost:9090/addNewProduct',
      product
    );
  }

  public getAllProducts(pageNumber: number, searchKeyword: string = '') {
    return this.httpClient.get<Product[]>(
      'http://localhost:9090/getAllProducts?pageNumber=' +
        pageNumber +
        '&searchKey=' +
        searchKeyword
    );
  }

  public deleteProduct(productId: number) {
    return this.httpClient.delete<Product>(
      'http://localhost:9090/deleteProductDetails/' + productId
    );
  }
  public getProductDetailsById(productId: number) {
    return this.httpClient.get<Product>(
      'http://localhost:9090/getProductByDetailsId/' + productId
    );
  }

  getProductDetails(isSingleProductCheckout: any, productId: number) {
    return this.httpClient.get<Product[]>(
      'http://localhost:9090/getProductDetails/' +
        isSingleProductCheckout +
        '/' +
        productId
    );
  }

  public placeOrder(orderDetails: OrderDetails, isCartCheckout: any) {
    return this.httpClient.post(
      'http://localhost:9090/placeOrder/' + isCartCheckout,
      orderDetails
    );
  }

  public addToCart(productId: any) {
    return this.httpClient.get('http://localhost:9090/addToCart/' + productId);
  }
  public getCartDetails() {
    return this.httpClient.get('http://localhost:9090/getCartDetails');
  }

  public getMyOrders(status: string): Observable<MyOrderDetails[]> {
    return this.httpClient.get<MyOrderDetails[]>(
      'http://localhost:9090/getOrderDetails/' + status
    );
  }

  public markAsDelivered(orderId: any) {
    return this.httpClient.get(
      'http://localhost:9090/markOrderAsDelivered/' + orderId
    );
  }

  //transaction  api
  public createTransaction(amount: any) {
    return this.httpClient.get(
      'http://localhost:9090/createTransaction/' + amount
    );
  }
}
