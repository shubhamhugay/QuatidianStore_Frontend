import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { map, Observable } from 'rxjs';

import { ProductService } from './../productService/product.service';
import { ImageProcessingService } from './../imageProcessingService/image-processing.service';
import { Product } from './../../_model/Product.model';

@Injectable({
  providedIn: 'root',
})
export class BuyProductResolverService implements Resolve<Product[]> {
  constructor(
    private productService: ProductService,
    private imageProcessingService: ImageProcessingService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Product[] | Observable<Product[]> | Promise<Product[]> {
    const id = route.paramMap.get('id');
    const isSingleProductCheckout = route.paramMap.get(
      'isSingleProductCheckout'
    );

    const productId = Number(id);

    return this.productService
      .getProductDetails(isSingleProductCheckout, productId)
      .pipe(
        map((x: Product[], i) =>
          x.map((product: Product) =>
            this.imageProcessingService.createImages(product)
          )
        )
      );
  }
}
