import { Component, OnInit } from '@angular/core';
import { CuentasService } from 'src/app/Services/cuentas.service';

@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.component.html',
  styleUrls: ['./cuentas.component.css']
})
export class CuentasComponent implements OnInit  {
  public cuentas: string[] = [];

  constructor(private cuentasService: CuentasService) { }

  ngOnInit(): void {
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
