import { from } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
//Routes
import { AppRoutingModule } from './app-routing.module';


//Components
import { AppComponent } from './app.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { NavbarComponent } from './components/general/navbar/navbar.component';
import { SesionNavbarComponent } from './components/admon/sesion-navbar/sesion-navbar.component';
import { EstadisticasComponent } from './components/general/estadisticas/estadisticas.component';
import { BuscarProductosComponent } from './components/general/buscar-productos/buscar-productos.component';
import { ContenedorComponent } from './components/general/contenedor/contenedor.component';
import { LoginComponent } from './components/admon/login/login.component';
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';
import { ContenedorAdminComponent } from './components/admon/administrador/contenedor-administrador/contenedor-administrador.component';
import { ContenedorEspecialistaComponent } from './components/admon/especialista/contenedor-especialista/contenedor-especialista.component';
import { EstadisticasEspecialistaComponent } from './components/admon/especialista/estadisticas-especialista/estadisticas-especialista.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { UploadDataComponent } from './components/admon/administrador/upload-data/upload-data.component';
import { UsersControlComponent } from './components/admon/administrador/users-control/users-control.component';
import { SelectCountrieComponent } from './components/shared/countrie/select-countrie/select-countrie.component';
///Services
import { CountrieService } from './services/countrie/countrie.service';
import { SelectChapterComponent } from './components/shared/chapter/select-chapter/select-chapter.component';
import { ChapterService } from './services/chapter/chapter.service';
import { YearService } from './services/year/year.service';
import { MonthService } from './services/month/month.service';
import { SelectYearComponent } from './components/shared/year/select-year/select-year.component';
import { SelectMonthComponent } from './components/shared/month/select-month/select-month.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    SesionNavbarComponent,
    EstadisticasComponent,
    BuscarProductosComponent,
    ContenedorComponent,
    LoginComponent,
    PageNotFoundComponent,
    ContenedorAdminComponent,
    ContenedorEspecialistaComponent,
    EstadisticasEspecialistaComponent,
    UploadDataComponent,
    UsersControlComponent,
    SelectCountrieComponent,
    SelectChapterComponent,
    SelectYearComponent,
    SelectMonthComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
     //RouterModule.forRoot( ROUTES, {useHash:true }),
  ],
  providers: [
    CountrieService,
    ChapterService,
    YearService,
    MonthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
