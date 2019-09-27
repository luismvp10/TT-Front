import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UploadService {

  postHeader = new HttpHeaders({
    Accept: 'application/json',
    Authorization: 'Token ' + localStorage.getItem('token')
  });
  env = environment;
  constructor(private  http: HttpClient) { }

  uploadFile(file: File) {
    const payload = new FormData();
    payload.append('document', file);
    console.log(file.name);
    return this.http.post( this.env.URI + '/countries/upload/',
              payload,
      {headers: this.postHeader});
  }
}
