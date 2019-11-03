     import { Component, OnInit } from '@angular/core';
     import {ChapterService} from '../../../services/chapter/chapter.service';
     import Swal from 'sweetalert2';

@Component({
  selector: 'app-buscar-productos',
  templateUrl: './buscar-productos.component.html',
  styleUrls: ['./buscar-productos.component.css']
})
export class BuscarProductosComponent implements OnInit {

  chapters: any[] = [];
  selected: any[] = [];
  keyword = 'name';
  flag = false;
  constructor(private chapter: ChapterService) {

    this.chapter.getChapters()
      .subscribe( (data: any) => {
          this.chapters = data;
      }, (errorService) => {
        if( errorService.status === 0) {

          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
          });

          Toast.fire({
            type: 'warning',
            title: 'Error de conexión con el servidor'
          });

        }
      });

  }


  ngOnInit() {
  }

  selectEvent(item) {
    // do something with selected item
    this.selected = item;
    this.flag = true;

  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e){
    // do something when input is focused
  }

}
