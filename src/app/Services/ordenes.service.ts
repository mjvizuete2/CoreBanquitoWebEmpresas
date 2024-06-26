import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CobrosService } from './cobros.service';

@Injectable({
  providedIn: 'root',
})
export class OrdenesService {
  private idReceivable: any;
  private idOrder: any;
  idUltimo: any;

  private header = {
    headers: new HttpHeaders({
      //'x-token':  environment.x_token,
      Accept: 'application/json',
    }),
  };
  private apiUrl = environment.CoreCobros_receivables;
  constructor(private http: HttpClient, private cobrosService: CobrosService) {
    this.idReceivable = this.generarIdUnico();
    this.idOrder = this.generarIdUnico();
  }

  public empresaxGmail(client: string) {
    return this.http.get<any>(
      `${this.apiUrl}/company/email/${client}`,
      this.header
    );
  }

  public empresaxName(name: any) {
    return this.http.get<any>(
      `${this.apiUrl}/company/search?namePattern=${name}`,
      this.header
    );
  }

  public fetchAndStoreEmpresa(client: string) {
    this.empresaxGmail(client).subscribe((response) => {
      localStorage.setItem('empresa', JSON.stringify(response));
    });
  }

  // public lastReceivable(){
  //   return this.http.get<any>(`${this.apiUrl}/receivables/last`, this.header);
  // }

  public obtenerUltimo(): void {
    this.cobrosService.lastReceivable().subscribe(
      (response) => {
        this.idUltimo = response.id;
        return this.idUltimo;
        console.error('Ultmio receivable', this.idUltimo);
      },
      (error) => {
        console.error('Error al obtener la empresa:', error);
      }
    );
  }

  public cuentasxempresa(idEmpresa: string) {
    return this.http.get<any>(
      `${this.apiUrl}/accounts/company/${idEmpresa}`,
      this.header
    );
  }

  public generarIdUnico(): string {
    const randomPart = Math.floor(100 + Math.random() * 900).toString();
    const timestamp = Date.now().toString().slice(0, 5);
    const uniqueId = `${randomPart}${timestamp}`;
    return uniqueId;
  }

  insertarReceivable(
    companyId: string,
    accountId: string,
    type: string,
    name: string,
    date: any
  ): Observable<any> {
    // this.obtenerUltimo();

    const body = {
      id: this.idReceivable,
      companyId: companyId,
      accountId: accountId,
      type: type,
      name: name,
      date: date,
    };

    return this.http.post<any>(`${this.apiUrl}/receivables`, body);
  }

  public insertarOrden(
    startDate: string,
    dueDate: string,
    totalAmount: string,
    records: string
  ): Observable<any> {
    console.log('idreceivable ', this.idUltimo);
    const body = {
      id: this.idOrder,
      receivableId: this.idReceivable,
      startDate: startDate,
      dueDate: dueDate,
      totalAmount: totalAmount,
      records: records,
      description: 'orden ingresada',
      status: 'PEN',
    };

    return this.http.post<any>(`${this.apiUrl}/orders`, body);
  }

  //orderId: this.idOrder,

  public insertarItemOrden(
    debtorName: string,
    identificationType: string,
    identification: string,
    debitAccount: string,
    owedAmount: string,
    counterpart: string,
    status: string
  ): Observable<any> {
    const body = {
      orderId: this.idOrder,
      debtorName: debtorName,
      identificationType: identificationType,
      identification: identification,
      debitAccount: debitAccount,
      owedAmount: owedAmount,
      counterpart: counterpart,
      status: 'PEN',
      orderItemId: this.generarIdUnico(),
    };

    return this.http.post<any>(`${this.apiUrl}/order-items`, body);
  }
}
