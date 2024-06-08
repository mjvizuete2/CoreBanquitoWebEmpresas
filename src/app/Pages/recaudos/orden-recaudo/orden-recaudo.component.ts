import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-orden-recaudo',
  templateUrl: './orden-recaudo.component.html',
  styleUrls: ['./orden-recaudo.component.css']
})
export class OrdenRecaudoComponent {

  recaudoForm!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.recaudoForm = this.formBuilder.group({
      nombres: ['', Validators.required],
      cedula: ['', Validators.required],
      nContrato: ['', Validators.required],
      monto: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaVencimiento: ['', Validators.required],
      cuentaAcreditar: ['', Validators.required],
      contrapartida: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  get f() { return this.recaudoForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.recaudoForm.invalid) {
      return;
    }

    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.recaudoForm.value, null, 4));
  }
}
