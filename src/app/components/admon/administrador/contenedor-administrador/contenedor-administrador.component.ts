import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contenedor-admin',
  templateUrl: './contenedor-administrador.component.html',
  styleUrls: ['./contenedor-administrador.component.css']
})
export class ContenedorAdminComponent implements OnInit {
loading:boolean = false;
  constructor() { }

  ngOnInit() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    },2000);
  }

}
