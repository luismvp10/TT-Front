import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {UserService} from "../../../services/user/user.service";
import  Swal  from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario:Object = {
    correo:"",
    password:""
  }

  constructor(private user: UserService) { }

  ngOnInit() {
  }


  login( forma:NgForm ){
    this.user.login(this.usuario)
      .subscribe( (data: any) => {
        Swal.fire({
          title: 'Bienvenido',
          type: 'success',
          showConfirmButton: false,
          timer: 2000
        });


      }, (errorService) => {

        if( errorService.status === 404){
          Swal.fire({
            title: 'Error!',
            text: 'El correo o contraseña son incorrectos',
            type: 'error',
            confirmButtonText: 'Ok'
          });
        }
        if( errorService.status === 0) {

          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
          });

          Toast.fire({
            type: 'warning',
            title: 'Error de conexión con el servidor'
          });

        }

      });
  }
}
