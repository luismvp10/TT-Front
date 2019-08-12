import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CountrieService } from '../../../../services/countrie/countrie.service';


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
        });

  }

  ngOnInit() {
  }

}
