import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Profile } from '../models/profile'

const httpOptions = {
  headers: new HttpHeaders({
    'content-Type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  ApiUrl: string = 'http://127.0.0.1:8000/profiles/'

  constructor(private http: HttpClient) { }

//addUser
  getProfiles():Observable<Profile[]>{
    return this.http.get<Profile[]>(this.ApiUrl, httpOptions);
  }
}
