import { Constants } from './../constants/constants';
import { Photo } from './../models/photo';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private apiUrl: string = Constants.apiUrl + "photos/";

  constructor(private httpClient: HttpClient) { }

  getAllPhotosByProductId(productId: number): Observable<ListResponseModel<Photo>> {
    return this.httpClient.get<ListResponseModel<Photo>>(this.apiUrl + "getAllByProductId?id=" + productId);
  }

  getPhotoById(photoId: number): Observable<SingleResponseModel<Photo>> {
    return this.httpClient.get<SingleResponseModel<Photo>>(this.apiUrl + "getById?id=" + photoId);
  }

  addPhoto(photo: Photo): Observable<SingleResponseModel<Photo>> {
    return this.httpClient.post<SingleResponseModel<Photo>>(this.apiUrl + "add", photo);
  }

  deletePhoto(photoId: number): Observable<SingleResponseModel<Photo>> {
    return this.httpClient.post<SingleResponseModel<Photo>>(this.apiUrl + "delete?id=" + photoId, null);
  }

  updatePhoto(photo: Photo): Observable<SingleResponseModel<Photo>> {
    return this.httpClient.post<SingleResponseModel<Photo>>(this.apiUrl + "update", photo);
  }

}
