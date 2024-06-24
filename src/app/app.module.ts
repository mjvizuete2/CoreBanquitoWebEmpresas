import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegistroComponent } from './Pages/registro/registro.component';
import { RecuperaContraComponent } from './Pages/recupera-contra/recupera-contra.component';
import { MenuComponent } from './Utilities/menu/menu.component';
import { PosicionConsolidadaComponent } from './Pages/posicion-consolidada/posicion-consolidada.component';
import { CuentasComponent } from './Pages/cuentas/cuentas.component';
import { OrdenCobroComponent } from './Pages/cobros/orden-cobro/orden-cobro.component';
import { ReportesCobrosComponent } from './Pages/cobros/reportes-cobros/reportes-cobros.component';
import { ReportesDiariosComponent } from './Pages/recaudos/reportes-diarios/reportes-diarios.component';
import { ReportesTiempoRealComponent } from './Pages/recaudos/reportes-tiempo-real/reportes-tiempo-real.component';
import { OnBoardingComponent } from './Pages/on-boarding/on-boarding.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    RecuperaContraComponent,
    MenuComponent,
    PosicionConsolidadaComponent,
    CuentasComponent,
    OrdenCobroComponent,
    ReportesCobrosComponent,
    ReportesDiariosComponent,
    ReportesTiempoRealComponent,
    OnBoardingComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    FormsModule

  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
