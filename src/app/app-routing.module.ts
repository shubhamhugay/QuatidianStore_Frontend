import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AddNewProductComponent } from './components/add-new-product/add-new-product.component';
import { BuyProductComponent } from './components/buy-product/buy-product.component';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';
import { ProductViewDetailsComponent } from './components/product-view-details/product-view-details.component';
import { ShowProductDetailsComponent } from './components/show-product-details/show-product-details.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './_auth/auth.guard';
import { BuyProductResolverService } from './_services/BuyProductResolver/buy-product-resolver.service';
import { ProductResolveService } from './_services/Resolver-product/product-resolve.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] },
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard],
    data: { roles: ['User'] },
  },
  { path: 'login', component: LoginComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  {
    path: 'addNewProduct',
    component: AddNewProductComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] },
    resolve: {
      product: ProductResolveService,
    },
  },

  {
    path: 'showProductDetails',
    component: ShowProductDetailsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] },
    resolve: {
      product: ProductResolveService,
    },
  },

  {
    path: 'productViewDetails',
    component: ProductViewDetailsComponent,
    resolve: {
      product: ProductResolveService,
    },
  },
  {
    path: 'buyProduct',
    component: BuyProductComponent,
    canActivate: [AuthGuard],
    data: { roles: ['User'] },
    resolve: {
      productDetails: BuyProductResolverService,
    },
  },
  {
    path: 'orderConfirm',
    component: OrderConfirmationComponent,
    canActivate: [AuthGuard],
    data: { roles: ['User'] },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule],
})
export class AppRoutingModule {}
