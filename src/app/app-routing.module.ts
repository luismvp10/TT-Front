import { BuscarProductosComponent } from './components/general/buscar-productos/buscar-productos.component';
import { EstadisticasComponent } from './components/general/estadisticas/estadisticas.component';
import { ContenedorComponent } from './components/general/contenedor/contenedor.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/admon/login/login.component';
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';
import { ContenedorEspecialistaComponent } from './components/admon/especialista/contenedor-especialista/contenedor-especialista.component';
import { ContenedorAdminComponent } from './components/admon/administrador/contenedor-administrador/contenedor-administrador.component';
const routes: Routes = [
  {path: 'home', component: ContenedorComponent,
  children:[
    {path: 'estadisticas', component: EstadisticasComponent, outlet: 'estadisticas' },
    {path: 'buscar', component: BuscarProductosComponent, outlet: 'buscar'},
  ]
  },

  {path: 'login', component: LoginComponent},
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'especialist', component:ContenedorEspecialistaComponent},
  {path: 'admon', component:ContenedorAdminComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

