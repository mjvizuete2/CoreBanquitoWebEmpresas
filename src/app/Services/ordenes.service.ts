import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
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
    return this.http.get<any>(`${this.apiUrl}/search?namePattern=${client}`, this.header);
  }

  public insertarOrden(){

  }

  public insertarItemOrden(){

  }

  public insertarOrdenCobro(){
    
  }


}
