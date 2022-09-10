import { Constants } from './../../../../constants/constants';
import { Product } from './../../../../models/product';
import { ToastrService } from 'ngx-toastr';
import { PhotoService } from './../../../../services/photo.service';
import { ProductService } from './../../../../services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-photos-panel',
  templateUrl: './photos-panel.component.html',
  styleUrls: ['./photos-panel.component.css']
})
export class PhotosPanelComponent implements OnInit {

  products: Product[] = [];
  dataLoaded: boolean = false;
  photoNumbers: number[] = [];

  constructor(
    private productService: ProductService,
    private photoService: PhotoService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe({
      next: (response) => {
        this.products = response.data;
        this.dataLoaded = true;
        this.products.forEach(p => {
          this.getNumberOfPhotos(p.id);
        });
      },
      error: (errorResponse) => {
        this.toastrService.error(Constants.dataError, errorResponse.error);
        this.dataLoaded = false;
      }
    });
  }

  getNumberOfPhotos(productId: number) {
    this.photoService.getAllPhotosByProductId(productId).subscribe({
      next: (response) => {
        this.photoNumbers[productId] = response.data.length
      },
      error: (errorResponse) => {
        this.toastrService.error(Constants.dataError, errorResponse.error);
      }
    });
  }

}
