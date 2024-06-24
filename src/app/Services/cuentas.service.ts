import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
//import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CuentasService {
  /* headers */
  private header = {
    headers: new HttpHeaders({
      //'x-token':  environment.x_token,
      Accept: 'application/json',
    }),
  };
  private apiUrl = environment.CoreCobros_receivables;
  private apiUrlTransacciones = environment.CoreBanquito_account;

  constructor(private http: HttpClient) {}

  public cuentasConsultar() {
    //return this.http.get<any>(this.url + '/api/agencias?find=vigente&value=1', this.header);
    return this.http.get<any>('./assets/pruebasJs/cuentas.json', this.header);
  }

  public transaccionesxCuenta(countNumber:any){
    return this.http.get<any>(`${this.apiUrlTransacciones}/account-transactions/transactions?codeUniqueAccount=${countNumber}`, this.header);
  }

}
