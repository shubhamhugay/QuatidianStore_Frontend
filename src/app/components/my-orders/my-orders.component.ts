import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../_services/productService/product.service';
import { Router } from '@angular/router';
import { MyOrderDetails } from '../../_model/order.model';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css',
})
export class MyOrdersComponent implements OnInit {
  constructor(private productService: ProductService, private router: Router) {}
  displayedColumns = ['Name', 'Address', 'Contact NO.', 'Amount', 'Status'];
  ngOnInit(): void {
    this.getOrderDetails();
  }

  myOrderDetails: MyOrderDetails[] = [];

  getOrderDetails() {
    this.productService.getMyOrders().subscribe(
      (resp) => {
        console.log(resp), (this.myOrderDetails = resp);
      },
      (error) => console.log(error)
    );
  }

  markAsDelivered(data: any) {
    this.productService.markAsDelivered(data).subscribe(
      (data) => {
        console.log(data);
        this.getOrderDetails();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
