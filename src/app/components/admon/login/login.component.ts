import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {UserService} from '../../../services/user/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading:boolean = false;
  usuario = {
    correo: '',
    password: ''
  };

  recordarme = false;

  constructor(private user: UserService,
              private router: Router) { }

  ngOnInit() {

    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    },2000);

    if ( localStorage.getItem('correo') ) {
      this.usuario.correo = localStorage.getItem('correo');
      this.recordarme = true;
    }
  }

  login( forma: NgForm ) {
    this.user.login(this.usuario)
      .subscribe( (data: any) => {
        Swal.close();
        if (this.recordarme) {
          localStorage.setItem('correo', this.usuario.correo);
        }
        console.log(data);
        Swal.fire({
          position: 'top-end',
          type: 'success',
          title: 'Bienvenido ' +data['name']+ '',
          showConfirmButton: false,
          timer: 1500
        })
        if (data['userType'] === 'specialist') {
          this.router.navigateByUrl('/especialist');
        } else if (data['userType'] === 'administrator') {
          this.router.navigateByUrl('/admon');
        }
      }, (errorService) => {

        Swal.fire({
          title: 'Error!',
          text: errorService.error.error,
          type: 'error',
          confirmButtonText: 'Ok',
        });
        if ( errorService.status === 0) {

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
