import { AuthService } from 'src/app/Services/auth.service';
import { Component, OnInit } from '@angular/core';
import { CobrosService } from 'src/app/Services/cobros.service';
import { CuentasService } from 'src/app/Services/cuentas.service';
import { OrdenesService } from 'src/app/Services/ordenes.service';
import { MatSnackBar } from '@angular/material/snack-bar';


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
    private ordenesService:OrdenesService,
    private snackBar: MatSnackBar,

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
              resad => {
                console.log('transaccion realizada:', this.idCuenta);
        
                this.ordenesService.accountsId(resad.accountId ).subscribe(
                  res => {
                    console.log('transaccion realizada:', this.idCuenta);
            
                    //Quito de la cuenta del cliente
                    this.cuentasService.transaccion(this.idCuenta, 'ref', cobro.owedAmount, res.accountNumber, cobro.debitAccount, '2024-06-27T12:00:00Z','DEB' ).subscribe(
                      res => {
                        console.log('transaccion realizada:', this.idCuenta);
                
                      },
                      error => {
                        console.error('Error al realizar la transaccion:', error);
                      }
                    );

                    this.cuentasService.cuenta(res.accountNumber).subscribe(
                      res => {
                          //Aumento en la cuenta de la empresa
                          this.cuentasService.transaccion(res.id, 'ref', cobro.owedAmount,cobro.debitAccount, res.codeUniqueAccount, '2024-06-27T12:00:00Z','CRE' ).subscribe(
                            res => {
                              console.log('transaccion realizada:', this.idCuenta);
                      
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
        this.snackBar.open('Item de orden pagado', 'Cerrar', {
          duration: 3000,
          panelClass: 'success-snackbar',
          verticalPosition: 'top',
        });

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

        this.ordenesService.itemOrderId(res.id).subscribe(
          res => {
              //Aumento en la cuenta de la empresa
              this.ordenesService.cobroId(res.id ).subscribe(
                res => {
                  this.ordenesService.recivablesId(res.id).subscribe(
                    res => {
                        //Aumento en la cuenta de la empresa
                        this.ordenesService.empresaId(res.id ).subscribe(
                          resempresas => {
                            console.log('empresas:', resempresas);
                    
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
        console.log('Cobros cargados:');


      },
      (error) => {
        console.error('Error al cargar cobros:', error);
      }
    );
  }
  
}
