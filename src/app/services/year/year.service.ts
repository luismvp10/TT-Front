import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class YearService {

  constructor(private http: HttpClient) { }
  env = environment;

  httpHeaders = new HttpHeaders({
    'Content-type': 'application/json'
  });

  getYears() {
    return this.http.get(this.env.URI + '/years/years',
    { headers: this.httpHeaders});
  }
}
