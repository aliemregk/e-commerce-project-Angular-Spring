import { Router } from '@angular/router';
import { Constants } from './../../../../constants/constants';
import { ToastrService } from 'ngx-toastr';
import { Category } from '../../../../models/category';
import { CategoryService } from '../../../../services/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories-panel',
  templateUrl: './categories-panel.component.html',
  styleUrls: ['./categories-panel.component.css']
})
export class CategoriesPanelComponent implements OnInit {

  categories: Category[] = [];
  dataLoaded: boolean = false;

  constructor(
    private categoryService: CategoryService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((response) => {
      this.categories = response.data;
      this.dataLoaded = response.success;
    });
  }

  delete(categoryId: number) {
    this.categoryService.deleteCategory(categoryId).subscribe({
      next: (response) => {
        this.toastrService.info(Constants.deleted, response.message);
      },
      error: (errorResponse) => {
        this.toastrService.error(Constants.deleteError, errorResponse.error);
      },
      complete: () => this.getCategories()
    });
  }
} 
