import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Services/authGuard';

import { LoginComponent } from './Pages/login/login.component';
import { RegistroComponent } from './Pages/registro/registro.component';
import { RecuperaContraComponent } from './Pages/recupera-contra/recupera-contra.component';
import { PosicionConsolidadaComponent } from './Pages/posicion-consolidada/posicion-consolidada.component';
import { CuentasComponent } from './Pages/cuentas/cuentas.component';
import { OrdenCobroComponent } from './Pages/cobros/orden-cobro/orden-cobro.component';
import { ReportesCobrosComponent } from './Pages/cobros/reportes-cobros/reportes-cobros.component';
import { OrdenRecaudoComponent } from './Pages/recaudos/orden-recaudo/orden-recaudo.component';
import { ReportesDiariosComponent } from './Pages/recaudos/reportes-diarios/reportes-diarios.component';
import { ReportesTiempoRealComponent } from './Pages/recaudos/reportes-tiempo-real/reportes-tiempo-real.component';
import { OnBoardingComponent } from './Pages/on-boarding/on-boarding.component';

const routes: Routes = [
  { path: '', component: LoginComponent , pathMatch: 'full'},
  { path: 'login', component: LoginComponent , pathMatch: 'full'},
  { path: 'registro', component: RegistroComponent},
  { path: 'recuperaContra', component: RecuperaContraComponent},
  { path: 'posicionConsolidada', component: PosicionConsolidadaComponent, canActivate: [AuthGuard]},
  { path: 'cuentas', component: CuentasComponent},
  { path: 'ordenCobro', component: OrdenCobroComponent},
  { path: 'reporteCobro', component: ReportesCobrosComponent},
  { path: 'ordenRecaudo', component: OrdenRecaudoComponent},
  { path: 'reporteRecaudo', component: ReportesDiariosComponent},
  { path: 'reporteTiempoReal', component: ReportesTiempoRealComponent},
  { path: 'onboarding', component: OnBoardingComponent},







];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
