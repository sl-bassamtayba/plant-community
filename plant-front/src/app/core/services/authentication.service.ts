import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser, User } from '../../../models/user';
import { Credentials } from '../../../models/credentials';
import { GenericResponse } from '../models/generic-response';
import { map } from 'rxjs/operators';
import { Constants } from 'src/constants';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public loggedUser: Observable<any>;
  private loggedUserSubject: BehaviorSubject<any>;

  private serviceUrl: string;

  // TODO : LOGIN & LOGOUT IN API
  constructor(private http: HttpClient) {
    //this.serviceUrl = Constants.baseURl + Constants.authServiceUrl;
    this.serviceUrl = Constants.baseURl + "users";

    const localUser = this.getLocalUser();
    this.loggedUserSubject = new BehaviorSubject<any>(localUser);
    this.loggedUser = this.loggedUserSubject.asObservable();
  }

  localLogin(credential: Credentials): Observable<User> {
    // TODO : temp url
    const url = this.serviceUrl + '1';

    return this.http.get<GenericResponse<IUser>>(url)
    .pipe(
      map(response => {
        var user = new User(response.Data);
        this.saveLocalUser(user);
        return user;
      })
    );
  }

  logout(user: User) {
    this.clearLocalStorage();
  }

  private saveLocalUser(user: User) {
    window.localStorage.setItem('loggedUser', JSON.stringify(user));
  }

  private getLocalUser() {
    const user = window.localStorage.getItem('loggedUser');
    if (user) {
      return JSON.parse(user);
    }
  }

  private clearLocalStorage() {
    window.localStorage.clear();
    this.loggedUserSubject.next(null);
  }
}
