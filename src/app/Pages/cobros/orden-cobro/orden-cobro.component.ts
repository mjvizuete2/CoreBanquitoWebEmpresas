import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';
import { AuthService } from 'src/app/Services/auth.service';
import { OrdenesService } from 'src/app/Services/ordenes.service';
import { concatMap } from 'rxjs/operators';
import { Observable,of } from 'rxjs';

@Component({
  selector: 'app-orden-cobro',
  templateUrl: './orden-cobro.component.html',
  styleUrls: ['./orden-cobro.component.css']
})
export class OrdenCobroComponent implements OnInit {
  usuario: any;
  excelData: any;
  cobroForm!: FormGroup;
  submitted = false;
  empresa: any;
  idEmpresa: any;
  cuentas: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private ordenesService: OrdenesService
  ) {
    this.usuario = authService.getUser();
    this.obtenerEmpresa();
  }

  ngOnInit(): void {
    this.cobroForm = this.formBuilder.group({
      order_id: ['', Validators.required],
      account_id: ['', Validators.required],
      start_date: ['', Validators.required],
      due_date: ['', Validators.required],
      file: ['', Validators.required],
      type: ['', Validators.required],
      empresa: [''],
      orders_items: [],
      records: 0,
      total_amount: 0
    });
  }

  get f() { return this.cobroForm.controls; }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.processExcel(file);
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

  obtenerEmpresa(): void {
    const currentUserStr = localStorage.getItem('currentUser');
    if (currentUserStr) {
      const currentUser = JSON.parse(currentUserStr);
      this.ordenesService.empresaxGmail(currentUser.email).subscribe(
        response => {

          this.empresa = response;
          localStorage.setItem('empresa', JSON.stringify(this.empresa));

          this.cobroForm.patchValue({
            empresa: this.empresa,
            orders_items: [],
            records: 0,
            total_amount: 0
          });

          console.log('respuesta gmail ',response);
          this.obtenerCuentasEmpresa(this.empresa.id);
        },
        error => {
          console.error('Error al obtener la empresa:', error);
        }
      );
    } else {
      console.error('No se encontró currentUser en localStorage.');
    }
  }

  obtenerCuentasEmpresa(idEmpresa: string): void {
    this.ordenesService.cuentasxempresa(idEmpresa).subscribe(
      response => {
        this.cuentas = response;
      },
      error => {
        console.error('Error al obtener las cuentas de la empresa:', error);
      }
    );
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
      status: '1'
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
      total_amount: totalAmount
    });

    console.log(this.cobroForm.value);
    const fechaISO = new Date(this.cobroForm.value.start_date);

    

    this.ordenesService.insertarOrdenCobro(
      this.cobroForm.value.empresa.id,
      this.cobroForm.value.account_id,
      this.cobroForm.value.type,
      this.cobroForm.value.order_id, 
      fechaISO
    ).pipe(
      concatMap(() => {
        return this.ordenesService.insertarOrden(
          this.cobroForm.value.start_date,
          this.cobroForm.value.due_date,
          this.cobroForm.value.total_amount.toString(),
          this.cobroForm.value.records.toString()
        );
      }),
      concatMap((ordenResponse: any) => {
        const orderId = ordenResponse.id;  // Obtener el ID de la orden creada
        console.log(orderId);
        // Mapear cada itemOrder para insertarlo secuencialmente
        return this.insertarItemOrdersSequentially(orderId, this.cobroForm.value.orders_items);
      })
    ).subscribe(
      (result: any) => {
        console.log('Inserciones realizadas con éxito:', result);
        // Aquí puedes manejar cualquier lógica adicional después de las inserciones
      },
      error => {
        console.error('Error al realizar las inserciones:', error);
      }
    );
  }

  insertarItemOrdersSequentially(orderId: string, itemOrders: any[]): Observable<any> {
    const observables = itemOrders.map(itemOrder => {
      return this.ordenesService.insertarItemOrden(
        itemOrder.debtorName,
        itemOrder.identificationType,
        itemOrder.identification,
        itemOrder.debitAccount,
        itemOrder.owedAmount,
        itemOrder.counterpart,
        'PEN'
      );
    });

    // Utilizamos reduce para encadenar las inserciones secuencialmente usando concatMap
    return observables.reduce((prev, curr) => {
      return prev.pipe(
        concatMap(() => curr)
      );
    }, of(null));
  }
}
