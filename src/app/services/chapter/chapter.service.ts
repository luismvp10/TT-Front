import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChapterService {

  constructor(private http: HttpClient) { }

  env = environment;

  httpHeaders = new HttpHeaders({
    'Content-type': 'application/json',
  });

  getChapters() {
    return this.http.get(this.env.URI + '/chapters/chapters',
      { headers: this.httpHeaders});

  }
}










