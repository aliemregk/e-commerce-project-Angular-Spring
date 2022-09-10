import { SingleResponseModel } from './../models/singleResponseModel';
import { Constants } from './../constants/constants';
import { Category } from './../models/category';
import { ListResponseModel } from './../models/listResponseModel';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl: string = Constants.apiUrl + "categories/";

  constructor(private httpClient: HttpClient) { }

  getCategories(): Observable<ListResponseModel<Category>> {
    return this.httpClient.get<ListResponseModel<Category>>(this.apiUrl + "getAll");
  }

  getCategoryById(categoryId: number): Observable<SingleResponseModel<Category>> {
    return this.httpClient.get<SingleResponseModel<Category>>(this.apiUrl + "getById?id=" + categoryId);
  }

  addCategory(category: Category): Observable<SingleResponseModel<Category>> {
    return this.httpClient.post<SingleResponseModel<Category>>(this.apiUrl + "add", category);
  }

  deleteCategory(categoryId: number): Observable<SingleResponseModel<Category>> {
    return this.httpClient.post<SingleResponseModel<Category>>(this.apiUrl + "delete?id=" + categoryId, null);
  }

  updateCategory(category: Category): Observable<SingleResponseModel<Category>> {
    return this.httpClient.post<SingleResponseModel<Category>>(this.apiUrl + "update", category);
  }

}
