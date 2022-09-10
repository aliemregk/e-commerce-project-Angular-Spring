import { Constants } from './../../../../constants/constants';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from './../../../../services/product.service';
import { Product } from './../../../../models/product';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products-panel',
  templateUrl: './products-panel.component.html',
  styleUrls: ['./products-panel.component.css']
})
export class ProductsPanelComponent implements OnInit {

  products: Product[] = [];
  dataLoaded: boolean = false;

  constructor(
    private productService: ProductService,
    private toastrService: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe({
      next: (response) => {
        this.products = response.data;
        this.dataLoaded = response.success;
      },
      error: (errorResponse) => {
        this.toastrService.error(errorResponse.error);
        this.dataLoaded = false
      }
    });
  }

  delete(productId: number) {
    this.productService.deleteProduct(productId).subscribe({
      next: (response) => {
        this.toastrService.info(Constants.deleted, response.message);
      },
      error: (errorResponse) => {
        this.toastrService.error(Constants.deleteError, errorResponse.error);
      },
      complete: () => {
        this.getProducts();
      }
    });
  }
}
