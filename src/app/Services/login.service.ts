import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private isLoggedInFlag: boolean = false;
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  isLoggedIn(): boolean {
    return this.isLoggedInFlag;
  }

  login(credentials: { user: string; password: string }): Observable<any> {
    this.isLoggedInFlag = true;
    return this.http.get(`${this.apiUrl}/data`);
  }

  // login(username: string, password: string): boolean {
  //   // Lógica para autenticar al usuario (puedes implementarla según tus necesidades)
  //   if (username === 'usuario' && password === 'contraseña') {
  //     this.isLoggedInFlag = true; // Establece el estado de autenticación como verdadero
  //     return true; // Devuelve verdadero si el inicio de sesión es exitoso
  //   } else {
  //     return false; // Devuelve falso si el inicio de sesión falla
  //   }
  // }

  // login(credentials: { user: string, password: string }): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/data`);

  // }

  register(user: { user: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }
}
