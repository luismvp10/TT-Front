import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contenedor',
  templateUrl: './contenedor.component.html',
  styleUrls: ['./contenedor.component.css']
})
export class ContenedorComponent implements OnInit {
  loading:boolean = false;
  constructor() { }

  ngOnInit() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    },2000);
  }

}
