import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';
import { AuthService } from 'src/app/Services/auth.service';
import { OrdenesService } from 'src/app/Services/ordenes.service';
import { concatMap, catchError } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClientService } from 'src/app/Services/client.service';

@Component({
  selector: 'app-orden-cobro',
  templateUrl: './orden-cobro.component.html',
  styleUrls: ['./orden-cobro.component.css'],
})
export class OrdenCobroComponent implements OnInit {
  usuario: any;
  excelData: any;
  cobroForm!: FormGroup;
  submitted = false;
  empresas: any;
  idEmpresa: any;
  cuentas: any;
  empresalocal: any;
  identificaciones: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private ordenesService: OrdenesService,
    private snackBar: MatSnackBar,
    private clientService: ClientService
  ) {
    this.usuario = authService.getUser();
    // this.obtenerEmpresa();
  }

  ngOnInit(): void {
    this.cobroForm = this.formBuilder.group({
      order_id: ['', Validators.required],
      account_id: ['', Validators.required],
      start_date: [
        '',
        [Validators.required, this.startDateValidator.bind(this)],
      ],
      due_date: ['', [Validators.required, this.dueDateValidator.bind(this)]],
      file: ['', Validators.required],
      type: ['', Validators.required],
      company_id: [''],
      orders_items: [],
      records: 0,
      total_amount: 0,
    });
    this.obtenerCuentasEmpresa();
    this.identificationArray();
  }

  get f() {
    return this.cobroForm.controls;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.processExcel(file);
    }
  }

  identificationArray() {
    this.clientService.allClients().subscribe(
      (response) => {
        this.identificaciones = response.map(
          (cliente: any) => cliente.identification
        );
      },
      (error) => {
        console.error(
          'Error al obtener las identificaciones de los clientes :',
          error
        );
      }
    );
  }

  // Validador personalizado para start_date (mayor o igual a la fecha actual)
  startDateValidator(control: any) {
    const selectedStartDate = new Date(control.value);
    const currentDate = new Date();
    if (selectedStartDate < currentDate) {
      return { invalidStartDate: true };
    }
    return null;
  }

  // Validador personalizado para due_date (mayor a start_date)
  dueDateValidator(control: any) {
    if (this.cobroForm) {
      // Verifica que el control start_date exista y no sea null
      const startDateControl = this.cobroForm.get('start_date');
      if (startDateControl) {
        // Accede a las propiedades del control start_date de manera segura
        if (
          startDateControl.errors &&
          (startDateControl.dirty || startDateControl.touched)
        ) {
          // Aquí manejas los errores o realizas otras acciones según necesites
        }
      }
    }
  }

  processExcel(file: File) {
    const fileReader = new FileReader();
    fileReader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      this.handleExcelData(workbook);
    };
    fileReader.readAsArrayBuffer(file);
  }

  handleExcelData(workbook: XLSX.WorkBook) {
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    this.excelData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
  }

  // obtenerEmpresa(): void {
  //   const currentUserStr = localStorage.getItem('currentUser');
  //   if (currentUserStr) {
  //     const currentUser = JSON.parse(currentUserStr);
  //     this.ordenesService.empresaxGmail(currentUser.email).subscribe(
  //       response => {

  //         this.empresas = response;
  //         localStorage.setItem('empresa', JSON.stringify(this.empresas));

  //         this.cobroForm.patchValue({
  //           empresa: this.empresas,
  //           orders_items: [],
  //           records: 0,
  //           total_amount: 0
  //         });

  //         console.log('respuesta gmail ',response);
  //         this.obtenerCuentasEmpresa(this.empresas.id);
  //       },
  //       error => {
  //         console.error('Error al obtener la empresa:', error);
  //       }
  //     );
  //   } else {
  //     console.error('No se encontró currentUser en localStorage.');
  //   }
  // }

  obtenerCuentasEmpresa(): void {
    const empresaStr = localStorage.getItem('empresa');
    if (empresaStr) {
      this.empresalocal = JSON.parse(empresaStr);
      this.ordenesService.cuentasxempresa(this.empresalocal[0].id).subscribe(
        (response) => {
          this.cuentas = response;
        },
        (error) => {
          console.error('Error al obtener las cuentas de la empresa:', error);
        }
      );
    } else {
      console.error('No se encontró currentUser en localStorage.');
    }
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.cobroForm.invalid) {
      return;
    }

    const itemOrders = this.excelData.map((row: any) => ({
      debtorName: row.debtorName,
      identificationType: row.identificationType,
      identification: row.identification,
      debitAccount: row.debitAccount,
      owedAmount: row.owedAmount,
      counterpart: row.counterpart,
      status: '1',
    }));

    const totalAmount = this.excelData.reduce((total: number, row: any) => {
      const rowTotal = parseFloat(row.owedAmount);
      if (!isNaN(rowTotal)) {
        return total + rowTotal;
      } else {
        return total;
      }
    }, 0);

    this.cobroForm.patchValue({
      orders_items: itemOrders,
      records: itemOrders.length,
      total_amount: totalAmount,
    });

    console.log(this.cobroForm.value);
    const fechaISO = new Date(this.cobroForm.value.start_date);

    this.ordenesService
      .insertarReceivable(
        this.empresalocal[0].id,
        this.cobroForm.value.account_id,
        this.cobroForm.value.type,
        this.cobroForm.value.order_id,
        fechaISO
      )
      .pipe(
        concatMap(() => {
          return this.ordenesService.insertarOrden(
            this.cobroForm.value.start_date,
            this.cobroForm.value.due_date,
            this.cobroForm.value.total_amount.toString(),
            this.cobroForm.value.records.toString()
          );
        }),
        concatMap((ordenResponse: any) => {
          const orderId = ordenResponse.id; // Obtener el ID de la orden creada
          console.log(orderId);
          // Mapear cada itemOrder para insertarlo secuencialmente
          return this.insertarItemOrdersSequentially(
            orderId,
            this.cobroForm.value.orders_items
          );
        })
      )
      .subscribe(
        (result: any) => {
          this.snackBar.open('Inserciones realizadas correctamente', 'Cerrar', {
            duration: 3000,
            panelClass: 'success-snackbar',
            verticalPosition: 'top',
          });
          console.log('Inserciones realizadas con éxito:', result);
          // window.location.reload();

          // Aquí puedes manejar cualquier lógica adicional después de las inserciones
        },
        (error) => {
          console.error('Error al realizar las inserciones:', error);

          this.snackBar.open('Error al realizar inserciones', 'Cerrar', {
            duration: 3000,
            panelClass: 'error-snackbar',
            verticalPosition: 'top',
          });
        }
      );
  }


  insertarItemOrdersSequentially(orderId: string, itemOrders: any[]): Observable<any> {
    const observables = itemOrders.map(itemOrder => {
      // Verificar si la identification está en el arreglo de identificaciones permitidas
      if (!this.existeIdentificationEnArreglo(itemOrder.identification.toString())) {
        // Si no está permitida, retornar un observable que emita null
        console.log("Identificación no permitida:", itemOrder.identification);
        return of(null);
      }
  
      // Si está permitida, llamar al servicio para insertar el itemOrder
      return this.ordenesService.insertarItemOrden(
        itemOrder.debtorName,
        itemOrder.identificationType,
        itemOrder.identification,
        itemOrder.debitAccount,
        itemOrder.owedAmount,
        itemOrder.counterpart,
        'PEN'
      ).pipe(
        catchError(error => {
          // Manejar errores aquí si es necesario
          console.error('Error al insertar itemOrder:', error);
          return throwError(error);
        })
      );
    });
  
    // Utilizar reduce para encadenar las inserciones secuencialmente usando concatMap
    return observables.reduce((prev, curr) => {
      return prev.pipe(
        concatMap(() => curr)
      );
    }, of(null));
  }
  
  // Función para verificar si la identification está en el arreglo de identificaciones permitidas
  private existeIdentificationEnArreglo(identification: string): boolean {
    return this.identificaciones.includes(identification);
  }

}

