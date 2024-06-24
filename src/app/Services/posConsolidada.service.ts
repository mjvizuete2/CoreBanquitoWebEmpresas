import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

//import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PosConsolidadaService {
  /* headers */
  private header = {
    headers: new HttpHeaders({
      //'x-token':  environment.x_token,
      Accept: 'application/json',
    }),
  };

  private url: string = environment.CoreCobros_receivables;

  constructor(private http: HttpClient) {}

  public posConsolidadaConsultar() {
    //return this.http.get<any>(this.url + '/data', this.header);
    return this.http.get<any>(
      './assets/pruebasJs/posConsolidada.json',
      this.header
    );
  }
}
