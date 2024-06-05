import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './Pages/login/login.component';
import { RegistroComponent } from './Pages/registro/registro.component';
import { RecuperaContraComponent } from './Pages/recupera-contra/recupera-contra.component';
import { PosicionConsolidadaComponent } from './Pages/posicion-consolidada/posicion-consolidada.component';
import { CuentasComponent } from './Pages/cuentas/cuentas.component';

const routes: Routes = [
  { path: '', component: LoginComponent , pathMatch: 'full'},
  { path: 'login', component: LoginComponent , pathMatch: 'full'},
  { path: 'registro', component: RegistroComponent},
  { path: 'recuperaContra', component: RecuperaContraComponent},
  { path: 'posicionConsolidada', component: PosicionConsolidadaComponent},
  { path: 'cuentas', component: CuentasComponent},




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
