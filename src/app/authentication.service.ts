import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Login } from './models/login'

const httpOptions = {
  headers: new HttpHeaders({
    'content-Type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<Login>;
  public currentUser: Observable<Login>;

  ApiUrl: string = 'http://127.0.0.1:8000/authentication/login/'

  constructor(private http: HttpClient) { 
    this.currentUserSubject = new BehaviorSubject<Login>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Login {
    return this.currentUserSubject.value;
}

//addUser
  Login(login:Login):Observable<Login>{
    return this.http.post<Login>(this.ApiUrl, login, httpOptions)
    .pipe(map(user => {
      // login successful if there's a jwt token in the response
      if (user && user.token) {
        console.log(user.token);
        
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
      }

      return user;
  }));
  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
}
}
