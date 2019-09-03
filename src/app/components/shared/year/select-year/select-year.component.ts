import { Component, OnInit } from '@angular/core';
import { YearService } from 'src/app/services/year/year.service';
import  Swal  from 'sweetalert2';

@Component({
  selector: 'app-select-year',
  templateUrl: './select-year.component.html',
  styleUrls: ['./select-year.component.css']
})
export class SelectYearComponent implements OnInit {
years: any [] = [];

  constructor(private year: YearService) {

    this.year.getYears()
        .subscribe( (data: any) => {
          this.years = data;
        }, ( errorService ) => {

          if ( errorService.status === 0) {

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

}
