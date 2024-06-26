import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { OrdenesService } from './ordenes.service';
import { ClientService } from './client.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.CoreBanquito_bank; // Usa la ruta relativa definida en el proxy

  constructor(
    private http: HttpClient, 
    private empresa: OrdenesService,
    private cliente:ClientService
  ) {}

  empresaFuncion(): void {
    const currentUserStr = localStorage.getItem('currentUser');

    if (currentUserStr) {
      const currentUser = JSON.parse(currentUserStr);
      this.empresa.empresaxGmail(currentUser.email).subscribe(
        (response) => {
          this.empresa = response;
          localStorage.setItem('empresa1', JSON.stringify(this.empresa));
        },
        (error) => {
          console.error('Error al obtener la empresa:', error);
        }
      );
    }
  }



  clienteFuncion(): void {
    const currentUserStr = localStorage.getItem('currentUser');

    if (currentUserStr) {
      const currentUser = JSON.parse(currentUserStr);
      this.cliente.clientexGmail(currentUser.email).subscribe(
        (response) => {
          this.cliente = response;
          localStorage.setItem('cliente', JSON.stringify(this.cliente));
        },
        (error) => {
          console.error('Error al obtener el cliente:', error);
        }
      );
    }
  }

  empresaFuncion2(): void {
    const cliente = localStorage.getItem('cliente');

    if (cliente) {
      const currentUser = JSON.parse(cliente);
      const companiaMayus= currentUser.companyName.toUpperCase();
      this.empresa.empresaxName(companiaMayus).subscribe(
        (response) => {
          this.empresa = response;
          localStorage.setItem('empresa', JSON.stringify(this.empresa));
        },
        (error) => {
          console.error('Error al obtener la empresa:', error);
        }
      );
    }
  }


  login(userName: string, password: string): Observable<boolean> {
    return this.http
      .put<{
        id: number;
        codeRole: string;
        nameRole: string;
        userName: string;
        firstName: string;
        lastName: string;
        password: string;
        state: string;
        typeUser: string;
        lastLogin: string;
        email: string;
        fullName: string;
      }>(this.apiUrl + '/login', { userName, password })
      .pipe(
        map((response) => {
          if (response.userName === userName) {
            localStorage.setItem(
              'currentUser',
              JSON.stringify({
                usuario: response.userName,
                rol: response.codeRole,
                fullName: response.fullName,
                email: response.email,
                lastLogin: response.lastLogin,
              })
            );
            // this.empresaFuncion();
            this.clienteFuncion();
            this.empresaFuncion2();

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
