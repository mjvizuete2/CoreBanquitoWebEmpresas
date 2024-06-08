import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CuentasService } from 'src/app/Services/cuentas.service';

@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.component.html',
  styleUrls: ['./cuentas.component.css'],
})
export class CuentasComponent implements OnInit {
  cuentasForm!: FormGroup;
  public cuentas: string[] = [];
  public movimientos: any[] = [];
  usuario: any;
  submitted = false;


  constructor(
    private cuentasService: CuentasService,
    private formBuilder: FormBuilder
  ) {}

  getItem(key: string): any {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  ngOnInit(): void {
    this.cuentasForm = this.formBuilder.group({
      cuentas: ['', Validators.required],
      tipo: ['', Validators.required],
      fechaInicio:  [''],
      fechaFin:  ['']

    });
    this.usuario = this.getItem('usuario');
    this.cargarCuentas();
  }


  get f() {
    return this.cuentasForm.controls;
  }

  cargarCuentas(): void {
    this.cuentasService.cuentasConsultar().subscribe(
      (res) => {
        if (res.status == 'success') {
          if (res.data && res.data.cuentas) {
            this.cuentas = res.data.cuentas.map((cuenta: any) => cuenta.numero);
          } else {
            console.error('Estructura de datos inesperada:', res);
          }
        }
      },
      (error) => {
        console.error('Error al cargar cuentas:', error);
      }
    );
  }


  cargarMovimientosCuentas(): void {
    this.cuentasService.cuentasConsultar().subscribe(
      // (res) => {
      //   console.log('Respuesta del servidor:', res);
      //     this.posConsolidada = res.posConsolidada;
      //     console.log('Cobros asignados:', this.posConsolidada);
      // },
      // (error) => {
      //   console.error('Error al cargar cobros:', error);
      // }

      (res) => {
        console.log('Respuesta del servidor:', res);
        if (res.status === 'success' && res.data && res.data.cuentas) {
          this.movimientos = res.data.cuentas;
          console.log('Cobros asignados:', this.movimientos);
        } else {
          console.error('Estructura de datos inesperada:', res);
        }
      },
      (error) => {
        console.error('Error al cargar cobros:', error);
      }
    );
  }


  onSubmit() {
    this.submitted = true;

    if (this.cuentasForm.valid) {
      const credentials = this.cuentasForm.value;
      // this.loginService.login(credentials).subscribe(
      //   (response) => {
      //     console.log('Login successful', response);
      //   },
      //   (error) => {
      //     console.error('Login failed', error);
      //   }
      // );
      this.cargarMovimientosCuentas();
      console.log(this.cuentasForm.value);
    }
  }
}
