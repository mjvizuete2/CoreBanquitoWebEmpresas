import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CuentasService } from 'src/app/Services/cuentas.service';
import { PosConsolidadaService } from 'src/app/Services/posConsolidada.service';

@Component({
  selector: 'app-posicion-consolidada',
  templateUrl: './posicion-consolidada.component.html',
  styleUrls: ['./posicion-consolidada.component.css'],
})
export class PosicionConsolidadaComponent implements OnInit {
  posForm!: FormGroup;
  public cuentas: string[] = [];
  public posConsolidada: any[] = [];
  usuario: any;
  submitted = false;

  constructor(
    private cuentasService: CuentasService,
    private posConsolidadaService: PosConsolidadaService,
    private formBuilder: FormBuilder
  ) {}

  getItem(key: string): any {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  ngOnInit(): void {
    this.posForm = this.formBuilder.group({
      cuentas: ['', Validators.required],
    });
    this.usuario = this.getItem('usuario');
    this.cargarCuentas();
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

  cargarReportePosicion(): void {
    this.posConsolidadaService.posConsolidadaConsultar().subscribe(
      // (res) => {
      //   console.log('Respuesta del servidor:', res);
      //     this.posConsolidada = res.posConsolidada;
      //     console.log('Cobros asignados:', this.posConsolidada);
      // },
      // (error) => {
      //   console.error('Error al cargar cobros:', error);
      // }

      (res) => {
        if (res.status === 'success' && res.data && res.data.posConsolidada) {
          this.posConsolidada = res.data.posConsolidada;
          console.log('Respuesta posicion consolidada:', this.posConsolidada);
        } else {
          console.error('Estructura de datos inesperada:', res);
        }
      },
      (error) => {
        console.error('Error al cargar cobros:', error);
      }
    );
  }

  get f() {
    return this.posForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.posForm.valid) {
      const credentials = this.posForm.value;
      // this.loginService.login(credentials).subscribe(
      //   (response) => {
      //     console.log('Login successful', response);
      //   },
      //   (error) => {
      //     console.error('Login failed', error);
      //   }
      // );
      this.cargarReportePosicion();

      console.log(this.posForm.value.cuentas);
    }
  }
}
