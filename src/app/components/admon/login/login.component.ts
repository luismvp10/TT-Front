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

  usuario = {
    correo: '',
    password: ''
  };

  recordarme = false;

  constructor(private user: UserService,
              private router: Router) { }

  ngOnInit() {
    if ( localStorage.getItem('correo') ) {
      this.usuario.correo = localStorage.getItem('correo');
      this.recordarme = true;
    }
  }

  login( forma: NgForm ) {
    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();
    this.user.login(this.usuario)
      .subscribe( (data: any) => {
        Swal.close();
        if (this.recordarme) {
          localStorage.setItem('correo', this.usuario.correo);
        }
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
