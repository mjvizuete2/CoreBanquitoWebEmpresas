import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
@Component({
  selector: 'app-orden-recaudo',
  templateUrl: './orden-recaudo.component.html',
  styleUrls: ['./orden-recaudo.component.css'],
})
export class OrdenRecaudoComponent implements OnInit {
  recaudoForm!: FormGroup;
  submitted = false;
  usuario: any;

  constructor(private formBuilder: FormBuilder,private authService:AuthService) {
    this.usuario=authService.getUser();
   }



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
      descripcion: ['', Validators.required],
    });
  }

  get f() {
    return this.recaudoForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.recaudoForm.invalid) {
      return;
    }

    console.log(this.recaudoForm.value);
  }
}
