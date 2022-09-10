import { Constants } from './../constants/constants';
import { Product } from './../models/product';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl: string = Constants.apiUrl + "products/";

  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<ListResponseModel<Product>> {
    return this.httpClient.get<ListResponseModel<Product>>(this.apiUrl + "getAll");
  }

  getProductById(productId: number): Observable<SingleResponseModel<Product>> {
    return this.httpClient.get<SingleResponseModel<Product>>(this.apiUrl + "getById?id=" + productId);
  }

  getProductsByCategoryId(categroyId: number): Observable<ListResponseModel<Product>> {
    return this.httpClient.get<ListResponseModel<Product>>(this.apiUrl + "getAllByCategoryId?categoryId=" + categroyId);
  }

  addProduct(product: Product): Observable<SingleResponseModel<Product>> {
    return this.httpClient.post<SingleResponseModel<Product>>(this.apiUrl + "add", product);
  }

  updateProduct(product: Product): Observable<SingleResponseModel<Product>> {
    return this.httpClient.post<SingleResponseModel<Product>>(this.apiUrl + "update", product);
  }

  deleteProduct(productId: number): Observable<SingleResponseModel<Product>> {
    return this.httpClient.post<SingleResponseModel<Product>>(this.apiUrl + "delete?id=" + productId, null);
  }
}
