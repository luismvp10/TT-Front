import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contenedor-especialista',
  templateUrl: './contenedor-especialista.component.html',
  styleUrls: ['./contenedor-especialista.component.css']
})
export class ContenedorEspecialistaComponent implements OnInit {
  loading:boolean = false;
  constructor() { }

  ngOnInit() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    },2000);

  }

}
