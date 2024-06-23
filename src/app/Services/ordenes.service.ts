import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OrdenesService {

  private idReceivable:any;
  private idOrder:any;
  private header = {
    headers: new HttpHeaders({
      //'x-token':  environment.x_token,
      Accept: 'application/json',
    }),
  };
  private apiUrl = environment.url_back;
  constructor(private http: HttpClient) {
    this.idReceivable = this.generarIdUnico();
    this.idOrder = this.generarIdUnico();
   }

  public empresaxGmail(client: string) {
    return this.http.get<any>(`${this.apiUrl}/company/email/${client}`, this.header);
  }

  public cuentasxempresa(idEmpresa: string) {
    return this.http.get<any>(`${this.apiUrl}/accounts/company/${idEmpresa}`, this.header);
  }

  public generarIdUnico(): string {
    const randomPart = Math.floor(10000 + Math.random() * 90000).toString();
    const timestamp = Date.now().toString();
    const uniqueId = `${randomPart}${timestamp}`;
    return uniqueId;
  }


  public insertarOrden( startDate: string, dueDate: string, totalAmount: string, records: string): Observable<any> {
    const body = {
      id: this.idOrder,
      receivablesId: this.idReceivable,
      startDate: startDate,
      dueDate: dueDate,
      totalAmount: totalAmount,
      rocords: records,
      description: "orden ingresada",
      status: "1"
    };

    return this.http.post<any>(`${this.apiUrl}/ordenes`, body);
  }

  public insertarItemOrden( debtorName: string, identificationType: string, identification: string, debitAccount: string,owedAccount: string,counterpart:string,status:string): Observable<any> {
    const body = {
      orderId: this.idOrder,
      debtorName: debtorName,
      identificationType: identificationType,
      identification: identification,
      debitAccount: debitAccount,
      owedAccount: owedAccount,
      counterpart:counterpart,
      status: "1"
    };

    return this.http.post<any>(`${this.apiUrl}/ordenes`, body);
  }



  insertarOrdenCobro(companyId: string, accountId: string, type: string, name: string, date: string): Observable<any> {
    const body = {
      id: this.idReceivable,
      companyId: companyId,
      accountId: accountId,
      typy: type,
      name: name,
      date: date
    };

    return this.http.post<any>(`${this.apiUrl}/ordenesCobro`, body);
  }


}
