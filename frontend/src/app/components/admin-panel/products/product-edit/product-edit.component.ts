import { Constants } from '../../../../constants/constants';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../services/product.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from '../../../../models/product';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  product: Product;
  dataLoaded: boolean = false;
  productUpdateForm: FormGroup;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.createProductUpdateForm();
    this.activatedRoute.params.subscribe((params) => {
      this.getProdctDetails(params["productid"]);
    });
  }

  createProductUpdateForm() {
    this.productUpdateForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(2)]],
      description: ["", [Validators.required, Validators.minLength(2)]],
      material: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(15)]],
      unitPrice: ["", [Validators.required, Validators.min(1)]],
      unitsInStock: ["", [Validators.required, Validators.min(0)]],
      coverImgUrl: ["", [Validators.required, Validators.minLength(2)]],
      categoryId: ["", Validators.required],
      discount: ["", [Validators.min(0), Validators.max(99)]]
    });
  }

  getProdctDetails(productId: number) {
    this.productService.getProductById(productId).subscribe({
      next: (response) => {
        this.product = response.data;
        this.dataLoaded = true;

        this.productUpdateForm.setValue({
          name: this.product.name,
          description: this.product.description,
          material: this.product.material,
          unitPrice: this.product.unitPrice,
          unitsInStock: this.product.unitsInStock,
          coverImgUrl: this.product.coverImgUrl,
          categoryId: this.product.categoryId,
          discount: this.product.discount
        });
      },
      error: (errorResponse) => {
        this.dataLoaded = false;
        this.toastrService.error(Constants.dataError, errorResponse.error);
      }
    });
  }

  update() {
    if (this.productUpdateForm.valid) {
      let productToUpdate = Object.assign({}, this.productUpdateForm.value);
      productToUpdate.id = this.product.id;

      this.productService.updateProduct(productToUpdate).subscribe({
        next: (response) => {
          this.toastrService.success(Constants.updated, "Product " + response.message);
        },
        error: (errorResponse) => {
          this.toastrService.error(Constants.updateError, errorResponse.error);
        },
        complete: () => this.router.navigate(["/productspanel"])
      });
    } else {
      this.toastrService.error(Constants.invalidValue);
    }
  }
}
