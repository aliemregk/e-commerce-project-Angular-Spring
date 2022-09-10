import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from './../../../../models/product';
import { Photo } from './../../../../models/photo';
import { Constants } from './../../../../constants/constants';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './../../../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { PhotoService } from './../../../../services/photo.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-photo-edit',
  templateUrl: './photo-edit.component.html',
  styleUrls: ['./photo-edit.component.css']
})
export class PhotoEditComponent implements OnInit {

  photoUpdateForm: FormGroup
  photo: Photo;
  dataLoaded: boolean = false;
  productId: number;

  constructor(
    private photoService: PhotoService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.createPhotoUpdateForm();
    this.activatedRoute.params.subscribe((params) => {
      this.getPhoto(params["photoid"]);
      this.productId = params["productid"];
    });
  }

  createPhotoUpdateForm() {
    this.photoUpdateForm = this.formBuilder.group({
      url: ["", Validators.required],
    });
  }

  getPhoto(photoId: number) {
    this.photoService.getPhotoById(photoId).subscribe({
      next: (response) => {
        this.photo = response.data;
        this.dataLoaded = true;

        this.photoUpdateForm.setValue({
          url: this.photo.url
        });
      },
      error: (errorResponse) => {
        this.toastrService.error(Constants.dataError, errorResponse.error);
      }
    });
  }

  update() {
    if (this.photoUpdateForm.valid) {
      let photoToUpdate = this.photoUpdateForm.value;
      photoToUpdate.productId = this.productId;
      photoToUpdate.id = this.photo.id;

      this.photoService.updatePhoto(photoToUpdate).subscribe({
        next: (response) => {
          this.toastrService.info(Constants.updated, response.message);
        },
        error: (errorResponse) => {
          this.toastrService.error(Constants.updateError, errorResponse.error);
        },
        complete: () => {
          this.router.navigate(["/productphotos/" + this.productId]);
        }
      });

    } else {
      this.toastrService.error(Constants.invalidValue);
    }
  }
}
