import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Services/authGuard';

import { LoginComponent } from './Pages/login/login.component';
import { RecuperaContraComponent } from './Pages/recupera-contra/recupera-contra.component';
import { CuentasComponent } from './Pages/cuentas/cuentas.component';
import { OrdenCobroComponent } from './Pages/cobros/orden-cobro/orden-cobro.component';
import { ReportesCobrosComponent } from './Pages/cobros/reportes-cobros/reportes-cobros.component';
import { OrdenRecaudoComponent } from './Pages/recaudos/orden-recaudo/orden-recaudo.component';
import { ReportesDiariosComponent } from './Pages/recaudos/reportes-diarios/reportes-diarios.component';
import { ReportesTiempoRealComponent } from './Pages/recaudos/reportes-tiempo-real/reportes-tiempo-real.component';

const routes: Routes = [
  { path: '', component: LoginComponent , pathMatch: 'full'},
  { path: 'login', component: LoginComponent , pathMatch: 'full'},
  { path: 'recuperaContra', component: RecuperaContraComponent},
  { path: 'cuentas', component: CuentasComponent, canActivate: [AuthGuard]},
  { path: 'ordenCobro', component: OrdenCobroComponent, canActivate: [AuthGuard]},
  { path: 'reporteCobro', component: ReportesCobrosComponent, canActivate: [AuthGuard]},
  { path: 'ordenRecaudo', component: OrdenRecaudoComponent, canActivate: [AuthGuard]},
  { path: 'reporteRecaudo', component: ReportesDiariosComponent, canActivate: [AuthGuard]},
  { path: 'reporteTiempoReal', component: ReportesTiempoRealComponent, canActivate: [AuthGuard]},






];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
