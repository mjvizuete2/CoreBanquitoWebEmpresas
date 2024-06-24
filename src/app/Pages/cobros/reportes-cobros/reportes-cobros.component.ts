import { AuthService } from 'src/app/Services/auth.service';
import { Component, OnInit } from '@angular/core';
import { CobrosService } from 'src/app/Services/cobros.service';
@Component({
  selector: 'app-reportes-cobros',
  templateUrl: './reportes-cobros.component.html',
  styleUrls: ['./reportes-cobros.component.css'],
})
export class ReportesCobrosComponent implements OnInit {
  public cobros: any[] = [];
  usuario: any;
  empresa: any;

  constructor(private cobrosService: CobrosService,private authService:AuthService) {
    this.usuario=authService.getUser();
   }

  getItem(key: string): any {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  ngOnInit(): void {
    this.cargarReportes2();
    const savedEmpresa = localStorage.getItem('empresa');
    if (savedEmpresa) {
      this.empresa = JSON.parse(savedEmpresa);
    }
  }

  pagarCobro(cobro: any): void {
    this.cobrosService.aprobarCobro(cobro).subscribe(
      (res)=>{
        window.location.reload(); 

      }, (error) => {
        console.error('Error al cargar cobros:', error);
      }
    )
  }

  cancelarCobro(cobro: any): void {
    console.log('Cobro a cancelar:', cobro);
  }

  idempresa:any=this.getItem("empresa");
  
  cargarReportes(): void {
    this.cobrosService.reportesCobrosConsultar(this.idempresa.id).subscribe(
      (res) => {
        // Mapeo de identificationType
        this.cobros = res.map((item:any) => {
          if (item.identificationType === 'CED') {
            item.identificationType = 'Cédula';
          } else if (item.identificationType === 'PAS') {
            item.identificationType = 'Pasaporte';
          }
          if (item.status === 'PEN') {
            item.status = 'Pendiente';
          } else if (item.status === 'PAG') {
            item.status = 'Pagado';
          }
          return item;
        });
        console.log('Respuesta reportes cobros', this.cobros);
      },
      (error) => {
        console.error('Error al cargar cobros:', error);
      }
    );
  }

  cargarReportes2(): void {
    this.cobrosService.consultaPorServicio('COB').subscribe(
      (data) => {
        this.cobros = data;
        this.cobros.forEach((cobro: any) => {
          if (cobro.identificationType === 'CED') {
            cobro.identificationType = 'Cédula';
          } else if (cobro.identificationType === 'PAS') {
            cobro.identificationType = 'Pasaporte';
          }
          if(cobro.status== 'PAG'){
            cobro.status='Pagado'
          }else{
             cobro.status='Pendiente'
          }
        });
        console.log('Cobros cargados:', this.cobros);
      },
      (error) => {
        console.error('Error al cargar cobros:', error);
      }
    );
  }
  
}
