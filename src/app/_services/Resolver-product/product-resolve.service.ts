import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { Product } from '../../_model/Product.model';
import { ProductService } from '../productService/product.service';
import { ImageProcessingService } from './../imageProcessingService/image-processing.service';

@Injectable({
  providedIn: 'root',
})
export class ProductResolveService implements Resolve<Product> {
  constructor(
    private productService: ProductService,
    private imageProcessionService: ImageProcessingService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Product> {
    const id = route.paramMap.get('productId');
    if (id) {
      //then we have to fetch details from backend

      // return this.productService
      //   .getProductDetailsById(id)
      //   .pipe(map((p) => this.imageProcessionService.createImages(p)));

      const productId = parseInt(id, 10);

      // Then we have to fetch details from the backend
      return this.productService
        .getProductDetailsById(productId)
        .pipe(map((p) => this.imageProcessionService.createImages(p)));
    } else {
      //if it is null return empty product observable
      return of(this.getProductDetails());
    }
  }

  getProductDetails() {
    return {
      productId: 0,
      productName: '',
      productDescription: '',
      productDiscountedPrice: 0,
      productActualPrice: 0,
      productImages: [],
    };
  }
}
