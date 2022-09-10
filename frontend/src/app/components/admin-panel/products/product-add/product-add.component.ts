import { Constants } from './../../../../constants/constants';
import { Category } from './../../../../models/category';
import { CategoryService } from './../../../../services/category.service';
import { ProductService } from './../../../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  productAddForm: FormGroup;
  categories: Category[] = [];
  categoryId: number;

  constructor(
    private productService: ProductService,
    private router: Router,
    private tostrService: ToastrService,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.createProductAddForm();
    this.getCategories();
  }

  createProductAddForm() {
    this.productAddForm = this.formBuilder.group({
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

  add() {
    if (this.productAddForm.valid) {
      let productToAdd = this.productAddForm.value;
      this.productService.addProduct(productToAdd).subscribe({
        next: (response) => {
          this.tostrService.success(Constants.added, response.message);
        },
        error: () => {
          this.tostrService.error(Constants.addError);
        },
        complete: () => {
          this.router.navigate(["/productspanel"]);
        }
      });
    } else {
      this.tostrService.error(Constants.invalidValue);
    }
  }

  getCategories() {
    this.categoryService.getCategories().subscribe({
      next: (response) => {
        this.categories = response.data;
      },
      error: () => {
        this.tostrService.error(Constants.dataError);
      },
    });
  }
}
