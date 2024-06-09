import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Pages/login/login.component';
import { RecuperaContraComponent } from './Pages/recupera-contra/recupera-contra.component';
import { MenuComponent } from './Utilities/menu/menu.component';
import { CuentasComponent } from './Pages/cuentas/cuentas.component';
import { OrdenCobroComponent } from './Pages/cobros/orden-cobro/orden-cobro.component';
import { ReportesCobrosComponent } from './Pages/cobros/reportes-cobros/reportes-cobros.component';
import { OrdenRecaudoComponent } from './Pages/recaudos/orden-recaudo/orden-recaudo.component';
import { ReportesDiariosComponent } from './Pages/recaudos/reportes-diarios/reportes-diarios.component';
import { ReportesTiempoRealComponent } from './Pages/recaudos/reportes-tiempo-real/reportes-tiempo-real.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RecuperaContraComponent,
    MenuComponent,
    CuentasComponent,
    OrdenCobroComponent,
    ReportesCobrosComponent,
    OrdenRecaudoComponent,
    ReportesDiariosComponent,
    ReportesTiempoRealComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,

  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
