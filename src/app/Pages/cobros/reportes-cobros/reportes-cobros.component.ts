import { AuthService } from 'src/app/Services/auth.service';
import { Component, OnInit } from '@angular/core';
import { CobrosService } from 'src/app/Services/cobros.service';
import { CuentasService } from 'src/app/Services/cuentas.service';
import { OrdenesService } from 'src/app/Services/ordenes.service';

@Component({
  selector: 'app-reportes-cobros',
  templateUrl: './reportes-cobros.component.html',
  styleUrls: ['./reportes-cobros.component.css'],
})
export class ReportesCobrosComponent implements OnInit {
  public cobros: any[] = [];
  usuario: any;
  empresa: any;
  idCuenta:any;
  numeroCuenta:any;

  constructor(
    private cobrosService: CobrosService,
    private authService:AuthService,
    private cuentasService:CuentasService,
    private ordenesService:OrdenesService
  ) {
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

  pagarCobro(cobro:any): void {
    this.cuentasService.cuenta(cobro.debitAccount).subscribe(
      res => {
        this.idCuenta = res.id;
        console.log('cuenta recibidos:', this.idCuenta);

        this.ordenesService.cobroId(cobro.orderId).subscribe(
          res => {
            console.log('transaccion realizada:', this.idCuenta);
    
            this.ordenesService.recivablesId(res.receivableId ).subscribe(
              res => {
                console.log('transaccion realizada:', this.idCuenta);
        
                this.ordenesService.accountsId(res.accountId ).subscribe(
                  res => {
                    console.log('transaccion realizada:', this.idCuenta);
            
                    this.cuentasService.transaccion(this.idCuenta, 'ref', cobro.owedAmount, res.accountNumber, cobro.debitAccount, '2024-06-27T12:00:00Z' ).subscribe(
                      res => {
                        console.log('transaccion realizada:', this.idCuenta);
                
                      },
                      error => {
                        console.error('Error al realizar la transaccion:', error);
                      }
                    );
                  },
                  error => {
                    console.error('Error al realizar la transaccion:', error);
                  }
                );

                
              },
              error => {
                console.error('Error al realizar la transaccion:', error);
              }
            );


          },
          error => {
            console.error('Error al realizar la transaccion:', error);
          }
        );

        
      },
      error => {
        console.error('Error al obtener los movimientos de la cuenta:', error);
      }
    );




    this.cobrosService.aprobarCobro(cobro.id).subscribe(
      (res)=>{
        // window.location.reload(); 

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
          console.log('item ',item)
          if (item.identificationType === 'CED') {
            item.identificationType = 'Cédula';
          } else if (item.identificationType === 'PAS') {
            item.identificationType = 'Pasaporte';
          }
          if (item.status === 'PEN') {
            item.status = 'Pendiente';
          } else if (item.status === 'PAG') {
            item.status = 'Aprobado';
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
          console.log(cobro);
          if (cobro.identificationType === 'CED') {
            cobro.identificationType = 'Cédula';
          } else if (cobro.identificationType === 'PAS') {
            cobro.identificationType = 'Pasaporte';
          }
          if(cobro.status== 'PAG'){
            cobro.status='Aprobado'
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
