import { BuscarProductosComponent } from './components/general/buscar-productos/buscar-productos.component';
import { EstadisticasComponent } from './components/general/estadisticas/estadisticas.component';
import { ContenedorComponent } from './components/general/contenedor/contenedor.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '**', pathMatch: 'full', redirectTo: 'home'},
  {path: 'estadisticas', component:EstadisticasComponent},
  {path: 'buscar', component:BuscarProductosComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
