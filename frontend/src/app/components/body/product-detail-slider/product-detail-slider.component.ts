import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../../../services/product.service';
import { Product } from './../../../models/product';
import { PhotoService } from './../../../services/photo.service';
import { Photo } from './../../../models/photo';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-detail-slider',
  templateUrl: './product-detail-slider.component.html',
  styleUrls: ['./product-detail-slider.component.css']
})
export class ProductDetailSliderComponent implements OnInit {

  product!: Product;
  photos: Photo[] = [];
  dataLoaded: boolean = false;
  photosLoaded: boolean = false;

  constructor(
    private photoService: PhotoService,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getProductById(params["productid"]);
      this.getAllPhotosByProductId(params["productid"]);
    });

  }

  getProductById(productId: number) {
    this.productService.getProductById(productId).subscribe((response) => {
      this.product = response.data;
      this.dataLoaded = true;
    });
  }

  getAllPhotosByProductId(productId: number) {
    this.photoService.getAllPhotosByProductId(productId).subscribe((response) => {
      this.photos = response.data;
      this.photosLoaded = true;
    });
  }
}
