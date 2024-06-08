import { Component, OnInit } from '@angular/core';
import { RecaudosService } from 'src/app/Services/recaudos.service';

@Component({
  selector: 'app-reportes-diarios',
  templateUrl: './reportes-diarios.component.html',
  styleUrls: ['./reportes-diarios.component.css']
})
export class ReportesDiariosComponent implements OnInit {

  public recaudos: any[] = [];

  constructor(private recaudosService: RecaudosService) { }

  ngOnInit(): void {
    this.cargarReportesRecaudos();
  }

  cargarReportesRecaudos(): void {
    this.recaudosService.reportesRecaudodsConsultar().subscribe(
      (res) => {
        console.log('Respuesta del servidor:', res); // Verifica la respuesta del servidor
        if (res.status === "success" && res.data && res.data.recaudos) {
          this.recaudos = res.data.recaudos;
          console.log('Cobros asignados:', this.recaudos); // Verifica la asignación de cobros
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
