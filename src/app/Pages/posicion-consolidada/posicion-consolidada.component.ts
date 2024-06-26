import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CuentasService } from 'src/app/Services/cuentas.service';
import { PosConsolidadaService } from 'src/app/Services/posConsolidada.service';
import { AuthService } from 'src/app/Services/auth.service';
import { OrdenesService } from 'src/app/Services/ordenes.service';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-posicion-consolidada',
  templateUrl: './posicion-consolidada.component.html',
  styleUrls: ['./posicion-consolidada.component.css'],
})
export class PosicionConsolidadaComponent implements OnInit {
  cuentasForm!: FormGroup;
  public cuentas: any;
  public posConsolidada: any[] = [];
  usuario: any;
  submitted = false;
  empresa: any;
  movimientos: any;



  constructor(
    private cuentasService: CuentasService,
    private posConsolidadaService: PosConsolidadaService,
    private formBuilder: FormBuilder,private authService:AuthService,
    private ordenesService: OrdenesService,
    private cdr: ChangeDetectorRef

  ) {
      this.usuario=authService.getUser();
     }


  ngOnInit(): void {
    this.cuentasForm = this.formBuilder.group({
      cuenta: ['', Validators.required]
    });
    // this.obtenerEmpresa();
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

  cargarMovimientosCuentas(countNumber: any): void {
    console.log('Cargando movimientos para la cuenta:', countNumber.cuenta);
    this.cuentasService.cuenta(countNumber.cuenta).subscribe(
      res => {
        console.log('Movimientos recibidos:', res);
        this.movimientos = res;
        this.cdr.detectChanges(); // Asegúrate de que Angular detecte los cambios
      },
      error => {
        console.error('Error al obtener los movimientos de la cuenta:', error);
      }
    );
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
    return this.cuentasForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.cuentasForm.valid) {
      const credentials = this.cuentasForm.value;
      console.log('Formulario enviado con:', credentials);
      this.cargarMovimientosCuentas(credentials);
      // this.loginService.login(credentials).subscribe(
      //   (response) => {
      //     console.log('Login successful', response);
      //   },
      //   (error) => {
      //     console.error('Login failed', error);
      //   }
      // );
      this.cargarReportePosicion();

      console.log(this.cuentasForm.value.cuentas);
    }
  }
}
