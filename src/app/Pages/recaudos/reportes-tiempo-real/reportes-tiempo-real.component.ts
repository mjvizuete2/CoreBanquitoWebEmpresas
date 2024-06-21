import { AuthService } from 'src/app/Services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Chart, registerables  } from 'chart.js';
import { RecaudosService } from 'src/app/Services/recaudos.service';

@Component({
  selector: 'app-reportes-tiempo-real',
  templateUrl: './reportes-tiempo-real.component.html',
  styleUrls: ['./reportes-tiempo-real.component.css']
})
export class ReportesTiempoRealComponent implements OnInit{
  chart: any;
  usuario:any;
  public recaudos: any[] = [];


  constructor(
    private recaudosService: RecaudosService,private authService:AuthService
  ) {this.authService = authService.getUser();
     Chart.register(...registerables);}






  ngOnInit(): void {
    this.cargarReportesRecaudos();
  }


  cargarReportesRecaudos(): void {
    this.recaudosService.reportesRecaudodsConsultar().subscribe(
      (res) => {
        if (res.status === 'success' && res.data && res.data.recaudos) {
          this.recaudos = res.data.recaudos;
          console.log('Respuesta reportes duarios:', this.recaudos);
          this.createChart(this.recaudos);
        } else {
          console.error('Estructura de datos inesperada:', res);
        }
      },
      (error) => {
        console.error('Error al cargar cobros:', error);
      }
    );
  }

  createChart(recaudos: any[]) {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    const montos = recaudos.map(recaudo => parseFloat(recaudo.monto));
    const labels = recaudos.map(recaudo => recaudo.fechaInicio);

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Montos',
          data: montos,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

}
