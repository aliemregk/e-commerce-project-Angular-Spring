import { ToastrService } from 'ngx-toastr';
import { CartService } from './../../../services/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchBarComponent } from './../search-bar/search-bar.component';
import { Product } from './../../../models/product';
import { ProductService } from './../../../services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  dataLoaded: boolean = false;
  public classReference = SearchBarComponent;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params["categoryid"]) {
        this.getProductsByCategoryId(params["categoryid"]);
      }
      else if (this.router.url.includes("/products/discounted")) {
        this.getDiscountedProducts();
      }
      else {
        this.getProducts();
      }
    });
  }

  getProducts() {
    this.productService.getProducts().subscribe((response) => {
      this.products = response.data;
      this.dataLoaded = true;
    });
  }

  getProductsByCategoryId(categoryId: number) {
    this.productService.getProductsByCategoryId(categoryId).subscribe((response) => {
      this.products = response.data;
      this.dataLoaded = true;
    });
  }

  getDiscountedProducts() {
    this.productService.getProducts().subscribe((response) => {
      this.products = response.data.filter(p => p.discount !== 0);
      this.dataLoaded = true;
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.toastrService.success(product.name + " added to cart.");
  }
}
