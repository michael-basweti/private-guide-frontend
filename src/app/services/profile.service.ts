import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Profile } from '../models/profile'

let token = localStorage.getItem('LoggedInUser')
console.log(`Token ${token}`);

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': `Token ${token}`
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  ApiUrl: string = 'http://127.0.0.1:8000/profiles/'
  currentUrl: string = 'http://127.0.0.1:8000/myProfile/'

  constructor(private http: HttpClient) { }

//addUser
  getProfiles():Observable<Profile[]>{
    console.log("this is localstorage", localStorage.getItem('currentUser'));
    
    return this.http.get<Profile[]>(this.ApiUrl, httpOptions);
  }

  getCurrentUserProfile():Observable<Profile[]>{
    console.log("this is localstorage", localStorage.getItem('currentUser'));
    return this.http.get<Profile[]>(this.currentUrl, httpOptions);
  }
}
