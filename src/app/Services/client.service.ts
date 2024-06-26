import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private apiUrl = environment.CoreBanquito_client;


  private header = {
    headers: new HttpHeaders({
      //'x-token':  environment.x_token,
      Accept: 'application/json',
    }),
  };
  
  constructor(private http: HttpClient) {}


  public clientexGmail(client: string) {
    return this.http.get<any>(`${this.apiUrl}/client/email/${client}`, this.header);
  }

  public allClients(){
    return this.http.get<any>(`${this.apiUrl}/client`, this.header);

  }

//   empresaFuncion():void{
//     const currentUserStr = localStorage.getItem('currentUser');

//     if (currentUserStr) {
//       const currentUser = JSON.parse(currentUserStr);
//       this.empresa.empresaxGmail(currentUser.email).subscribe(
//         response => {
//           this.empresa = response;
//           localStorage.setItem('empresa', JSON.stringify(this.empresa));
//         },
//         error => {
//           console.error('Error al obtener la empresa:', error);
//         }
//       );
//   }
// }

//   login(userName: string, password: string): Observable<boolean> {


//     return this.http.put<{
//       id: number,
//       codeRole: string,
//       nameRole: string,
//       userName: string,
//       firstName: string,
//       lastName: string,
//       password: string,
//       state: string,
//       typeUser: string,
//       lastLogin: string,
//       email: string,
//       fullName: string
//     }>(this.apiUrl+'/login', { userName, password })
//       .pipe(
//         map(response => {
//           if (response.userName === userName) {
//             localStorage.setItem('currentUser', JSON.stringify({
//               usuario: response.userName,
//               rol: response.codeRole,
//               fullName: response.fullName,
//               email: response.email,
//               lastLogin: response.lastLogin
//             })
            
//           );
//           this.empresaFuncion();

//             return true;
//           } else {
//             return false;
//           }
//        })
//   );
//   }

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
