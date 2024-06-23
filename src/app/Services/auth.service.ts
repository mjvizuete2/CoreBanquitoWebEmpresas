import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { OrdenesService } from './ordenes.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.url_backlogin; // Usa la ruta relativa definida en el proxy

  constructor(private http: HttpClient,private ordenesService: OrdenesService) {}

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
    }>(`${this.apiUrl}/login`, { userName, password })
      .pipe(
        switchMap(response => {
          if (response.userName === userName) {
            return this.ordenesService.empresaxGmail(response.fullName).pipe(
              map(empresaResponse => {
                localStorage.setItem('currentUser', JSON.stringify({
                  usuario: response.userName,
                  rol: response.codeRole,
                  fullName: response.fullName,
                  email: response.email,
                  lastLogin: response.lastLogin,
                  empresa: empresaResponse
                }));
                return true;
              }),
              catchError(error => {
                console.error('Error fetching empresa:', error);
                return of(false);
              })
            );
          } else {
            return of(false);
          }
        }),
        catchError(error => {
          console.error('Login error:', error);
          return of(false);
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
