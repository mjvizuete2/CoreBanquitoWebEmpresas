import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<boolean> {
    return this.http
      .get<{
        status: string;
        code: string;
        count: number;
        data: {
          user: {
            id: number;
            usuario: string;
            password: string;
            rol: string;
          }[];
        };
      }>('localhost:8080/login')
      .pipe(
        map((response) => {
          console.log('respuesta ', response);
          const user = response.data.user.find(
            (u) => u.usuario === username && u.password === password
          );
          if (user) {
            localStorage.setItem(
              'currentUser',
              JSON.stringify({ usuario: user.usuario, rol: user.rol })
            );
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
