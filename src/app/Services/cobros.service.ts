import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

//import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CobrosService {
  /* headers */
  private header = {
    headers: new HttpHeaders({
      //'x-token':  environment.x_token,
      Accept: 'application/json',
    }),
  };
  private apiUrl = environment.CoreCobros_receivables;


  constructor(private http: HttpClient) {}




  public reportesCobrosConsultar(id:any){
    return this.http.get<any>(`${this.apiUrl}/order-items/search?companyId=${id}`, this.header);
  }

  public aprobarCobro(id:any){
    return this.http.put<any>(`${this.apiUrl}/order-items/${id}/status?status=PAG`, this.header);
  }

  public consultaPorServicio(servicioo:any) {
    return this.http.get<any>( `${this.apiUrl}/order-items/search/by-type?type=${servicioo}`, this.header);
  
  }
}
