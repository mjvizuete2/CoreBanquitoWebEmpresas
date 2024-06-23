import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OrdenesService {
  private header = {
    headers: new HttpHeaders({
      //'x-token':  environment.x_token,
      Accept: 'application/json',
    }),
  };
  private apiUrl = environment.url_back;
  constructor(private http: HttpClient) { }

  public empresaxGmail(client: string) {
    return this.http.get<any>(`${this.apiUrl}/company/email/${client}`, this.header);
  }

  public cuentasxempresa(idEmpresa: string) {
    return this.http.get<any>(`${this.apiUrl}/accounts/company/${idEmpresa}`, this.header);
  }

  


  public insertarOrden(){

  }

  public insertarItemOrden(){

  }

  insertarOrdenCobro(companyId: string, accountId: string, type: string, name: string, date: string): Observable<any> {
    const body = {
      COMPANY_ID: companyId,
      ACCOUNT_ID: accountId,
      TYPE: type,
      NAME: name,
      DATE: date
    };

    return this.http.post<any>(`${this.apiUrl}/ordenesCobro`, body);
  }


}
