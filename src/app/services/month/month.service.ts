import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MonthService {

  constructor(private http: HttpClient) { }
  env = environment;

  httpHeaders = new HttpHeaders({
    'Content-type': 'application/json'
  });

  getMonths() {
    return this.http.get(this.env.URI + '/months/months',
    { headers: this.httpHeaders});
  }
}
