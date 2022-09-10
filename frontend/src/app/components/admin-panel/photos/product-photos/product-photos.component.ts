import { Constants } from './../../../../constants/constants';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../../../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { PhotoService } from './../../../../services/photo.service';
import { Product } from './../../../../models/product';
import { Photo } from './../../../../models/photo';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-photos',
  templateUrl: './product-photos.component.html',
  styleUrls: ['./product-photos.component.css']
})
export class ProductPhotosComponent implements OnInit {

  photos: Photo[] = [];
  dataLoaded: boolean = false;
  photosLoaded: boolean = false;
  product: Product;

  constructor(
    private photoService: PhotoService,
    private toastrService: ToastrService,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getProductById(params["productid"]);
      this.getPhotosByProduct(params["productid"]);
    });
  }

  getPhotosByProduct(productId: number) {
    this.photoService.getAllPhotosByProductId(productId).subscribe({
      next: (response) => {
        this.photos = response.data;
        this.photosLoaded = true;
      },
      error: (errorResponse) => {
        this.toastrService.error(Constants.dataError, errorResponse.error);
      }
    });
  }

  getProductById(productId: number) {
    this.productService.getProductById(productId).subscribe((response) => {
      this.product = response.data;
      this.dataLoaded = true;
    });
  }

  delete(photoId: number) {
    this.photoService.deletePhoto(photoId).subscribe({
      next: (response) => {
        this.toastrService.info(Constants.deleted, response.message);
      },
      error: (errorResponse) => {
        this.toastrService.error(Constants.deleteError, errorResponse.error);
      },
      complete: () => {
        this.ngOnInit()
      }
    });
  }


}
