import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CountrieService } from '../../../../services/countrie/countrie.service';
import  Swal  from 'sweetalert2';

@Component({
  selector: 'app-select-countrie',
  templateUrl: './select-countrie.component.html',
  styleUrls: ['./select-countrie.component.css']
})
export class SelectCountrieComponent implements OnInit {
  countries: any[] = [];
  loading: boolean;

  constructor( private countrie: CountrieService) {

    this.loading = true;
    this.countrie.getCountries()
        .subscribe( (data: any) => {
          this.countries = data;
          this.loading = true;
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
