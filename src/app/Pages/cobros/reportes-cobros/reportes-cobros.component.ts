import { Component, OnInit } from '@angular/core';
import { CobrosService } from 'src/app/Services/cobros.service'; 

@Component({
  selector: 'app-reportes-cobros',
  templateUrl: './reportes-cobros.component.html',
  styleUrls: ['./reportes-cobros.component.css']
})
export class ReportesCobrosComponent  implements OnInit {

  public cobros: any[] = [];
  usuario:any;

  constructor(private cobrosService: CobrosService) { }

  getItem(key: string): any {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  ngOnInit(): void {
    this.usuario = this.getItem('usuario');
    this.cargarReportes();
  }

  cargarReportes(): void {
    this.cobrosService.reportesCobrosConsultar().subscribe(
      (res) => {
        console.log('Respuesta del servidor:', res); // Verifica la respuesta del servidor
        if (res.status === "success" && res.data && res.data.cobros) {
          this.cobros = res.data.cobros;
          console.log('Cobros asignados:', this.cobros); // Verifica la asignación de cobros
        } else {
          console.error('Estructura de datos inesperada:', res);
        }
      },
      (error) => {
        console.error('Error al cargar cobros:', error);
      }
    );
  }
}
