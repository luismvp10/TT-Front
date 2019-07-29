import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CountrieService } from '../../../../services/countrie/countrie.service';


@Component({
  selector: 'app-select-countrie',
  templateUrl: './select-countrie.component.html',
  styleUrls: ['./select-countrie.component.css']
})
export class SelectCountrieComponent implements OnInit {
  paises: any[] = [];

  constructor( private countrie: CountrieService) {
    console.log('Constructor hecho desde servicio');
    this.countrie.getCountries()
        .subscribe( (data: any) => {
          //console.log(data);
          this.paises = data;
        });

  }

  ngOnInit() {
  }

}
