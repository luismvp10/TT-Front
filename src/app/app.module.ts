import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { NavbarComponent } from './components/general/navbar/navbar.component';
import { SesionNavbarComponent } from './components/admon/sesion-navbar/sesion-navbar.component';
import { EstadisticasComponent } from './components/general/estadisticas/estadisticas.component';
import { BuscarProductosComponent } from './components/general/buscar-productos/buscar-productos.component';
import { ContenedorComponent } from './components/general/contenedor/contenedor.component';
import { LoginComponent } from './components/admon/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    SesionNavbarComponent,
    EstadisticasComponent,
    BuscarProductosComponent,
    ContenedorComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
