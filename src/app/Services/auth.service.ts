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
    private empresaService: OrdenesService,
    private clienteService: ClientService
  ) {}

  // empresaFuncion(): void {
  //   const currentUserStr = localStorage.getItem('currentUser');

  //   if (currentUserStr) {
  //     const currentUser = JSON.parse(currentUserStr);
  //     this.empresa.empresaxGmail(currentUser.email).subscribe(
  //       (response) => {
  //         this.empresa = response;
  //         localStorage.setItem('empresa1', JSON.stringify(this.empresa));
  //       },
  //       (error) => {
  //         console.error('Error al obtener la empresa:', error);
  //       }
  //     );
  //   }
  // }

  clienteFuncion(): void {
    const currentUserStr = localStorage.getItem('currentUser');

    if (currentUserStr) {
      const currentUser = JSON.parse(currentUserStr);
      this.clienteService.clientexGmail(currentUser.email).subscribe(
        (response) => {
          const clienteResponse = response; // Almacena la respuesta en una variable local
          localStorage.setItem('cliente', JSON.stringify(clienteResponse));

          const companiaMayus = clienteResponse.companyName.toUpperCase();
          this.empresaService.empresaxName(companiaMayus).subscribe(
            (response) => {
              const empresaResponse = response; // Almacena la respuesta en una variable local
              localStorage.setItem('empresa', JSON.stringify(empresaResponse));
            },
            (error) => {
              console.error('Error al obtener la empresa:', error);
            }
          );
        },
        (error) => {
          console.error('Error al obtener el cliente:', error);
        }
      );
    }
  }

  // empresaFuncion2(): void {
  //   const cliente = localStorage.getItem('cliente');

  //   if (cliente) {
  //     const currentUser = JSON.parse(cliente);
  //     const companiaMayus = currentUser.companyName.toUpperCase();
  //     this.empresaService.empresaxName(companiaMayus).subscribe(
  //       (response) => {
  //         const empresaResponse = response; // Almacena la respuesta en una variable local
  //         localStorage.setItem('empresa', JSON.stringify(empresaResponse));
  //       },
  //       (error) => {
  //         console.error('Error al obtener la empresa:', error);
  //       }
  //     );
  //   }
  // }

  login(userName: string, password: string): Observable<boolean> {
    return this.http
      .put<any>(`${this.apiUrl}/login`, { userName, password })
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
            // this.empresaFuncion2();
            this.clienteFuncion();
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
    localStorage.removeItem('cliente');
    localStorage.removeItem('empresa');
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
