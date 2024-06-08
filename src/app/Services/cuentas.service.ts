import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

//import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CuentasService {

  /* headers */
  private header = {
    headers: new HttpHeaders({
      //'x-token':  environment.x_token,
      'Accept': 'application/json',
    })
  };


  constructor(private http: HttpClient) { }


  public cuentasConsultar(){
    //return this.http.get<any>(this.url + '/api/agencias?find=vigente&value=1', this.header);
    return this.http.get<any>('./assets/pruebasJs/cuentas.json', this.header);

  }
}
