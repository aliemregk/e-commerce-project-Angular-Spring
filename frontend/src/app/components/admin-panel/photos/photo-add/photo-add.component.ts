import { Constants } from './../../../../constants/constants';
import { ProductService } from './../../../../services/product.service';
import { Product } from './../../../../models/product';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { PhotoService } from './../../../../services/photo.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-photo-add',
  templateUrl: './photo-add.component.html',
  styleUrls: ['./photo-add.component.css']
})
export class PhotoAddComponent implements OnInit {

  photoAddForm: FormGroup
  product: Product;
  dataLoaded: boolean = false;

  constructor(
    private photoService: PhotoService,
    private productService: ProductService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.createPhotoAddForm();
    this.activatedRoute.params.subscribe((params) => {
      this.getProduct(params["productid"]);
    });
  }

  createPhotoAddForm() {
    this.photoAddForm = this.formBuilder.group({
      url: ["", Validators.required],
    });
  }

  getProduct(productId: number) {
    this.productService.getProductById(productId).subscribe({
      next: (response) => {
        this.product = response.data;
        this.dataLoaded = true;
      },
      error: (errorResponse) => {
        this.toastrService.error(Constants.dataError, errorResponse.error);
      }
    });
  }

  add() {
    if (this.photoAddForm.valid) {
      let photoToAdd = this.photoAddForm.value;
      photoToAdd.productId = this.product.id;
      this.photoService.addPhoto(photoToAdd).subscribe({
        next: (response) => {
          if (response.success) {
            this.toastrService.info(Constants.added, response.message);
          } else {
            this.toastrService.error(Constants.addError, response.message);
          }
        },
        error: (errorResponse) => {
          this.toastrService.error(Constants.addError, errorResponse.error);
        },
        complete: () => {
          this.router.navigate(["/productphotos/" + this.product.id]);
        }
      });

    } else {
      this.toastrService.error(Constants.invalidValue);
    }
  }
}
