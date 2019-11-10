import { BuscarProductosComponent } from './components/general/buscar-productos/buscar-productos.component';
import { EstadisticasComponent } from './components/general/estadisticas/estadisticas.component';
import { ContenedorComponent } from './components/general/contenedor/contenedor.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/admon/login/login.component';
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';
import { ContenedorEspecialistaComponent } from './components/admon/especialista/contenedor-especialista/contenedor-especialista.component';
import { ContenedorAdminComponent } from './components/admon/administrador/contenedor-administrador/contenedor-administrador.component';
import { IsSpecialistGuard } from './guards/is-specialist.guard';
import { IsAdministratorGuard } from './guards/is-administrator.guard';
import { RecoverComponent } from './components/admon/recover/recover.component';
import { EmailComponent } from './components/admon/email/email.component';


const routes: Routes = [
  {path: 'home', component: ContenedorComponent,
  children:[
    {path: 'estadisticas', component: EstadisticasComponent, outlet: 'estadisticas' },
    {path: 'buscar', component: BuscarProductosComponent, outlet: 'buscar'},
  ]
  },

  {path: 'login', component: LoginComponent},
  {path: 'send_email', component: EmailComponent},
  {path: 'recover/:u', component: RecoverComponent},
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'especialist', component: ContenedorEspecialistaComponent, canActivate: [ IsSpecialistGuard ] },
  {path: 'admon', component: ContenedorAdminComponent, canActivate: [ IsAdministratorGuard ] },
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

