import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  constructor(private http: HttpClient) { }

  env = environment;

  HttpHeaders = new HttpHeaders({
    'Content-type': 'application/json'
  });

  getSections(id: string) {
    return this.http.get(this.env.URI + '/sections/section/' + id,
    {headers: this.HttpHeaders });
  }
}
