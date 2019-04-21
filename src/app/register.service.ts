import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { Observable } from 'rxjs'
import { User } from './models/user'

const httpOptions = {
  headers: new HttpHeaders({
    'content-Type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  ApiUrl: string = 'http://127.0.0.1:8000/authentication/users/'

  constructor(private http: HttpClient) { }

//addUser
  CreateUser(user:User):Observable<User>{
    return this.http.post<User>(this.ApiUrl, user, httpOptions);
  }
}
