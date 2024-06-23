import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CuentasService } from 'src/app/Services/cuentas.service';
import { AuthService } from 'src/app/Services/auth.service';
import { OrdenesService } from 'src/app/Services/ordenes.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.component.html',
  styleUrls: ['./cuentas.component.css'],
})
export class CuentasComponent implements OnInit {
  cuentasForm!: FormGroup;
  public cuentas: any;
  movimientos: any;
  usuario: any;
  submitted = false;
  empresa: any;
  cuenta: any;

  constructor(
    private cuentasService: CuentasService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private ordenesService: OrdenesService,
    private cdr: ChangeDetectorRef
  ) {
    this.usuario = authService.getUser();
    this.obtenerEmpresa();
  }

  ngOnInit(): void {
    this.cuentasForm = this.formBuilder.group({
      cuenta: [''],
      tipo: ['', Validators.required],
      fechaInicio: [''],
      fechaFin: [''],
    });
  }

  get f() {
    return this.cuentasForm.controls;
  }

  obtenerEmpresa(): void {
    const currentUserStr = localStorage.getItem('currentUser');
    if (currentUserStr) {
      const currentUser = JSON.parse(currentUserStr);
      this.ordenesService.empresaxGmail(currentUser.email).subscribe(
        response => {
          this.empresa = response;
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
        console.error('Error al obtener las cuentas de la empresa:');
      }
    );
  }

  cargarMovimientosCuentas(countNumber: any): void {
    this.cuentasService.transaccionesxCuenta(countNumber.cuenta).subscribe(
      res => {
        this.movimientos = res;
        this.cdr.detectChanges();
      },
      error => {
        console.error('Error al obtener las cuentas de la empresa:', error);
      }
    );
  }

  onSubmit() {
    this.submitted = true;
    if (this.cuentasForm.valid) {
      const credentials = this.cuentasForm.value;
      this.cargarMovimientosCuentas(credentials);
    }
  }
}
