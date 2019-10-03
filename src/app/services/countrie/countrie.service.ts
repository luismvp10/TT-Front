import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountrieService {

  constructor(private http: HttpClient) { }

  env = environment;

  httpHeaders = new HttpHeaders({
    'Content-type': 'application/json',
  });


  getCountries() {
    return this.http.get(this.env.URI + '/countries/countries',
    { headers: this.httpHeaders });

  }

  getCountriesByOperation(operation, year) {
    if ( year !== undefined) {
      return this.http.get(this.env.URI + '/countries/country/' + operation + '/year/' + year,
    { headers: this.httpHeaders });
    } else {
      return this.http.get(this.env.URI + '/countries/country/' + operation,
      { headers: this.httpHeaders });
    }
  }
}
