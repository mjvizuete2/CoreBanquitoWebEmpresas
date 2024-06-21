import { Component, OnInit } from '@angular/core';
import { RecaudosService } from 'src/app/Services/recaudos.service';
import { AuthService } from 'src/app/Services/auth.service';
@Component({
  selector: 'app-reportes-diarios',
  templateUrl: './reportes-diarios.component.html',
  styleUrls: ['./reportes-diarios.component.css'],
})
export class ReportesDiariosComponent implements OnInit {
  usuario: any;

  public recaudos: any[] = [];

  constructor(private recaudosService: RecaudosService,private authService:AuthService) {
    this.usuario=authService.getUser();
   }




  ngOnInit(): void {
    this.cargarReportesRecaudos();
  }

  cargarReportesRecaudos(): void {
    this.recaudosService.reportesRecaudodsConsultar().subscribe(
      (res) => {
        if (res.status === 'success' && res.data && res.data.recaudos) {
          this.recaudos = res.data.recaudos;
          console.log('Respuesta reportes duarios:', this.recaudos);
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
