import { Constants } from '../../../../constants/constants';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../../../services/category.service';
import { Category } from '../../../../models/category';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {

  category: Category;
  dataLoaded: boolean = false;
  categoryUpdateForm: FormGroup;

  constructor(
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.createCategoryForm();
    this.activatedRoute.params.subscribe((params) => {
      this.getCategory(params["categoryid"]);
    });
  }

  createCategoryForm() {
    this.categoryUpdateForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      photoUrl: ["", Validators.required]
    });
  }

  getCategory(categoryId: number) {
    this.categoryService.getCategoryById(categoryId).subscribe({
      next: (response) => {
        this.category = response.data;
        this.dataLoaded = response.success;

        this.categoryUpdateForm.setValue({
          name: this.category.name,
          photoUrl: this.category.photoUrl
        });
      },
      error: (errorResponse) => {
        this.dataLoaded = false;
        this.toastrService.error(Constants.dataError, errorResponse.error);
      }
    });
  }

  update() {
    if (this.categoryUpdateForm.valid) {
      let categoryToUpdate = Object.assign({}, this.categoryUpdateForm.value);
      categoryToUpdate.id = this.category.id;

      this.categoryService.updateCategory(categoryToUpdate).subscribe({
        next: (response) => {
          this.toastrService.success(Constants.updated, response.message);
        },
        error: (errorResponse) => {
          this.toastrService.error(Constants.updateError, errorResponse.error);
        },
        complete: () => {
          this.router.navigate(["categoriespanel"]);
        }
      });
    } else {
      this.toastrService.error(Constants.invalidValue);
    }
  }
}
