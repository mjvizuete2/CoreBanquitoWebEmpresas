import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.url_back; // Usa la ruta relativa definida en el proxy

  constructor(private http: HttpClient) {}

  login(userName: string, password: string): Observable<boolean> {
    return this.http.put<{
      id: number,
      codeRole: string,
      nameRole: string,
      userName: string,
      firstName: string,
      lastName: string,
      password: string,
      state: string,
      typeUser: string,
      lastLogin: string,
      email: string,
      fullName: string
    }>(this.apiUrl+'/login', { userName, password })
      .pipe(
        map(response => {
          // Verifica si el nombre de usuario coincide
          if (response.userName === userName) {
            // Guarda la información relevante en localStorage
            localStorage.setItem('currentUser', JSON.stringify({
              usuario: response.userName,
              rol: response.codeRole,
              fullName: response.fullName,
              email: response.email,
              lastLogin: response.lastLogin
            }));
            return true;
          } else {
            return false;
          }
        })
      );
  }

  logout(): void {
    // Eliminar la información del usuario de localStorage o sessionStorage
    localStorage.removeItem('currentUser');
  }

  getUser(): any {
    // Obtener la información del usuario almacenada
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  isAuthenticated(): boolean {
    // Verificar si el usuario está autenticado
    return this.getUser() !== null;
  }
}
