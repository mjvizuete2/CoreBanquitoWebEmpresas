import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-orden-cobro',
  templateUrl: './orden-cobro.component.html',
  styleUrls: ['./orden-cobro.component.css']
})
export class OrdenCobroComponent implements OnInit{
  usuario:any;


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
      usuario: ['', Validators.required],
      cuentaAcreditar: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaVencimiento: ['', Validators.required],
      frecuencia: ['', Validators.required]
    });
  }

  get f() { return this.cobroForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.cobroForm.invalid) {
      return;
    }

    console.log(this.cobroForm.value);
  }
}
