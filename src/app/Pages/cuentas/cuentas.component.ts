import { Component, OnInit } from '@angular/core';
import { CuentasService } from 'src/app/Services/cuentas.service';

@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.component.html',
  styleUrls: ['./cuentas.component.css']
})
export class CuentasComponent implements OnInit  {
  public cuentas: string[] = [];
  usuario:any;


  constructor(private cuentasService: CuentasService) { }

  getItem(key: string): any {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  ngOnInit(): void {
    this.usuario = this.getItem('usuario');
    this.cargarCuentas();
  }

  cargarCuentas(): void {
    this.cuentasService.cuentasConsultar().subscribe(
      (res) => {
        if(res.status=="success"){
          if (res.data && res.data.cuentas) {
            this.cuentas = res.data.cuentas.map((cuenta: any) => cuenta.numero);
          } else {
            console.error('Estructura de datos inesperada:', res);
          }
        }
      },
      (error) => {
        console.error('Error al cargar cuentas:', error);
      }
    );
  }
}
