import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';

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

  constructor(private formBuilder: FormBuilder) { }

  getItem(key: string): any {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  ngOnInit(): void {
    this.usuario = this.getItem('usuario');

    this.cobroForm = this.formBuilder.group({
      referencia: ['', Validators.required],
      cuentaAcreditar: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaVencimiento: ['', Validators.required],
      file: ['', Validators.required]
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

    const combinedData = this.excelData.map((row: any) => ({
      ...this.cobroForm.value,
      ...row
    }));
  
    console.log(combinedData);

  }
}
