import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  login(credentials: { user: string, password: string }): Observable<any> {
    return this.http.get(`${this.apiUrl}/data`);

  }

  // login(credentials: { user: string, password: string }): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/data`);

  // }

  register(user: { user: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }
}
