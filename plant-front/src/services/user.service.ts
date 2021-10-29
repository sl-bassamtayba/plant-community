import { Injectable } from '@angular/core';
import {IUser, User} from '../models/user';
import {IUserPlant, UserPlant} from '../models/userPlant';
import {IQuestion, Question} from '../models/question';
import {ITransaction, Transaction} from '../models/transaction';
import { IWishList, WishList} from '../models/wishlist';
import { Constants } from 'src/constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GenericResponse } from 'src/app/core/models/generic-response';
import { ResponseStatus } from 'src/app/core/enums/response-status';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private serviceUrl: string;

  constructor(private http: HttpClient) {
    this.serviceUrl = Constants.baseURl + Constants.userServiceUrl;
  }

  getAll(): Observable<User[]> {
    const url = this.serviceUrl;

    return this.http
    .get<GenericResponse<IUser[]>>(url)
    .pipe(
      map(response => response.Data.map(json => new User(json)))
    );
  }

  getOne(id: number): Observable<User> {
    const url = this.serviceUrl + id;

    return this.http
    .get<GenericResponse<IUser>>(url)
    .pipe(
      map(response => new User(response.Data))
    );
  }

  getUserWishlist(id: number): Observable<WishList[]> {
    const url = this.serviceUrl + id + '/wishlist';

    return this.http
    .get<GenericResponse<IWishList[]>>(url)
    .pipe(
      map(response => response.Data.map(json => new WishList(json)))
    );
  }

  getUserPlant(id: number): Observable<UserPlant[]> {
    const url = this.serviceUrl + id + '/plants';

    return this.http
    .get<GenericResponse<IUserPlant[]>>(url)
    .pipe(
      map(response => response.Data.map(json => new UserPlant(json)))
    );
  }

  getUserQuestions(id: number): Observable<Question[]> {
    const url = this.serviceUrl + id + '/questions';

    return this.http
    .get<GenericResponse<IQuestion[]>>(url)
    .pipe(
      map(response => response.Data.map(json => new Question(json)))
    );
  }

  getUserTransactions(id: number): Observable<Transaction[]> {
    const url = this.serviceUrl + id + '/questions';

    return this.http
    .get<GenericResponse<ITransaction[]>>(url)
    .pipe(
      map(response => response.Data.map(json => new Transaction(json)))
    );
  }

  createUser(user: User): Observable<User> {
    const url = this.serviceUrl;
    const body = {
      user
    };

    return this.http.post<GenericResponse<IUser>>(url, body)
    .pipe(
      map(response => new User(response.Data))
    );
  }

  updateUser(user: User): Observable<boolean> {
    const url = this.serviceUrl + user.Id;
    const body = {
      user: user
    };

    return this.http.put<GenericResponse<boolean>>(url, body)
    .pipe(
      map(response => response.Data)
    );
  }

  deleteUser(id: number): Observable<boolean> {
    const url = this.serviceUrl + id;

    return this.http.delete<GenericResponse<boolean>>(url).pipe(
      map(response => {
        if(response.Status === ResponseStatus.OK)
          return response.Data || true;
        return false;
      })
    );
  }

}
