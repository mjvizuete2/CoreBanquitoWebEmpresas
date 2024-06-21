import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';
import { AuthService } from 'src/app/Services/auth.service';
import { count } from 'rxjs';
@Component({
  selector: 'app-orden-cobro',
  templateUrl: './orden-cobro.component.html',
  styleUrls: ['./orden-cobro.component.css']
})

export class OrdenCobroComponent implements OnInit{
  usuario:any;
  excelData:any;
  cobroForm!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,private authService:AuthService) {
    this.usuario=authService.getUser();
   }



  ngOnInit(): void {

    this.cobroForm = this.formBuilder.group({
      order_id: ['', Validators.required],
      account_id: ['', Validators.required],
      start_date: ['', Validators.required],
      due_date: ['', Validators.required],
      file: ['', Validators.required],
      type: ['', Validators.required]
      // frecuencia: ['', Validators.required]
    });
  }

  get f() { return this.cobroForm.controls; }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      // Aquí puedes procesar el archivo Excel
      this.processExcel(file);
    }
  }

  processExcel(file: File) {
    const fileReader = new FileReader();
    fileReader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      // Aquí puedes trabajar con el contenido del archivo Excel
      this.handleExcelData(workbook);
    };
    fileReader.readAsArrayBuffer(file);
  }

  handleExcelData(workbook: XLSX.WorkBook) {
    // Aquí puedes acceder a las hojas del archivo Excel y realizar el procesamiento necesario
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    this.excelData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
  }


  onSubmit() {
    this.submitted = true;

    if (this.cobroForm.invalid) {
      return;
    }

    const itemOrders = this.excelData.map((row: any) => ({
      ...row
    }));

    const totalAmount = this.excelData.reduce((total: number, row: any) => {
      // Verificar si row.total es un número válido antes de sumarlo
      const rowTotal = parseFloat(row.total); // Convertir a número (si es necesario)
      if (!isNaN(rowTotal)) {
        return total + rowTotal;
      } else {
        return total; // No sumar si row.total no es un número válido
      }
    }, 0);


    this.cobroForm.value.orders_items = itemOrders;
    this.cobroForm.value.records = itemOrders.length;
    this.cobroForm.value.total_amount = totalAmount;
    console.log(this.cobroForm.value);

  }
}
