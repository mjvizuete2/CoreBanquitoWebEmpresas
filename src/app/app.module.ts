import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegistroComponent } from './Pages/registro/registro.component';
import { RecuperaContraComponent } from './Pages/recupera-contra/recupera-contra.component';
import { MenuComponent } from './Utilities/menu/menu.component';
import { PosicionConsolidadaComponent } from './Pages/posicion-consolidada/posicion-consolidada.component';
import { CuentasComponent } from './Pages/cuentas/cuentas.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    RecuperaContraComponent,
    MenuComponent,
    PosicionConsolidadaComponent,
    CuentasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
