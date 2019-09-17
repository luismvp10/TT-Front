import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {NgForm} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private  http: HttpClient) { }
  env = environment;

  httpHeaders = new HttpHeaders( {
    'Accept': 'application/json'
  });

  login(usuario: Object ) {
    let payload= new FormData();
    payload.append('username', usuario["correo"]);
    payload.append('password', usuario["password"])
    // console.log("Aca vamos ",usuario["correo"]);
    console.log(payload);
    return this.http.post( this.env.URI + '/users/login/',
              payload,
      {headers: this.httpHeaders });
  }
}
