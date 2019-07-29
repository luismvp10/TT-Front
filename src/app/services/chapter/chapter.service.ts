import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChapterService {
  env = environment;

  paises: any[] = [];

  httpHeaders = new HttpHeaders({
    'Content-type': 'application/json',
  });
  constructor() { }

  getChapters(){

  }
}
