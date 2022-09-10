import { Constants } from './../../../../constants/constants';
import { Category } from './../../../../models/category';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from './../../../../services/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {

  categoryAddForm: FormGroup;

  constructor(
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.createCategoryForm();
  }

  createCategoryForm() {
    this.categoryAddForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      photoUrl: ["", Validators.required]
    });
  }

  add() {
    if (this.categoryAddForm.valid) {
      let newCategory = Object.assign({}, this.categoryAddForm.value);

      this.categoryService.addCategory(newCategory).subscribe({
        next: (response) => {
          this.toastrService.success(Constants.added, response.message);
        },
        error: (errorResponse) => {
          this.toastrService.error(Constants.addError, errorResponse.error);
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
