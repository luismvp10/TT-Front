import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubshipmentService {

  constructor(private http: HttpClient) { }

  env = environment;

  HttpHeaders = new HttpHeaders({
    'Content-type': 'application/json',
  });

  getSubshipments(id: string) {
    return this.http.get(this.env.URI + '/subshipments/subshipment/' + id,
    {headers: this.HttpHeaders});
  }
}
