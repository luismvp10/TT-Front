import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {NgForm} from '@angular/forms';
import { map} from 'rxjs/operators';
import { async } from 'q';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private  http: HttpClient) {
    if (localStorage.getItem('token')) {
      this.validate().subscribe(data => {
        if ( data === false ) {
          this.logout();
          location.reload();
        }
      });
    }
  }

  env = environment;
  userToken: string;
  userType: string;

  httpHeaders = new HttpHeaders( {
    Accept: 'application/json'
  });

  login( usuario ) {
    const payload = new FormData();
    payload.append('username', usuario['correo']);
    payload.append('password', usuario['password']);
    // console.log("Aca vamos ",usuario["correo"]);
    console.log(payload);
    return this.http.post( this.env.URI + '/users/login/',
              payload,
      {headers: this.httpHeaders }).pipe(
        map( resp => {
          this.guardarToken(resp['token'], resp['userType']);
          return resp;
        })
      );
  }

  validate() {
    const payload = new FormData();
    payload.append('token', localStorage.getItem('token'));
    return this.http.post( this.env.URI + '/users/validate/',
              payload,
      {headers: this.httpHeaders }).pipe(
        map( resp => {
          return resp['error'];
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
  }

  guardarToken(idToken: string, userType: string) {
    localStorage.setItem('token', idToken);
    localStorage.setItem('userType', userType);
  }

  esEspecialista(): boolean {
    if ( localStorage.getItem('token')  && localStorage.getItem('userType') === 'specialist') {
      return true;
    }
    return false;
  }

  esAdministrador(): boolean {
    if ( localStorage.getItem('token')  && localStorage.getItem('userType') === 'administrator') {
      return true;
    }
    return false;
  }

}

