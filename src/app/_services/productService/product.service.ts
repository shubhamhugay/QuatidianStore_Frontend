import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../_model/Product.model';
import { OrderDetails } from './../../_model/order-details.models';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}

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

  public placeOrder(orderDetails: OrderDetails) {
    return this.httpClient.post(
      'http://localhost:9090/placeOrder',
      orderDetails
    );
  }
}
