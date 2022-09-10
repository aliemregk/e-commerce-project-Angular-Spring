import { SingleResponseModel } from './../models/singleResponseModel';
import { User } from './../models/user';
import { Observable } from 'rxjs';
import { Constants } from './../constants/constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl: string = Constants.apiUrl + "users/";

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<ListResponseModel<User>> {
    return this.httpClient.get<ListResponseModel<User>>(this.apiUrl + "getAll");
  }

  getUserByEmail(email: string): Observable<SingleResponseModel<User>> {
    return this.httpClient.get<SingleResponseModel<User>>(this.apiUrl + "getByEmail?email=" + email);
  }

  getUserById(userId: number): Observable<SingleResponseModel<User>> {
    return this.httpClient.get<SingleResponseModel<User>>(this.apiUrl + "getById?id=" + userId);
  }

  deleteUser(userId: number): Observable<SingleResponseModel<User>> {
    return this.httpClient.post<SingleResponseModel<User>>(this.apiUrl + "delete?id=" + userId, null);
  }

  updateUser(user: User): Observable<SingleResponseModel<User>> {
    return this.httpClient.post<SingleResponseModel<User>>(this.apiUrl + "update", user);
  }
}
