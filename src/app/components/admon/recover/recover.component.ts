import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {UserService} from '../../../services/user/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.css']
})
export class RecoverComponent implements OnInit {
  loading:boolean = false;
  usuario = {
    password: '',
    password2: ''

  };
  username: string;

  recordarme = false;

  constructor(private user: UserService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {

    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 2000);
    this.route.paramMap.subscribe(params => {
      this.username = params.get('u');
      if (this.username === null) {
        this.router.navigateByUrl('**');
      }
      const a = '#$&*-.0123456789@ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';
      let email = '';
      for (let i = 0; i < this.username.length; i++) {
        const p = a.indexOf(this.username[i]);
        const C = (p + 60) % 70;
        email = email + a[C];
      }
      this.username = email;
      this.user.allow_to_recover(this.username).subscribe(data => {
      }, ( errorService ) => {
        this.router.navigateByUrl('**');
      });
    });
  }

  recover( forma: NgForm ) {
    if (this.usuario.password !== this.usuario.password2) {
      Swal.fire({
        title: 'Error!',
        text: 'Las contraseñas deben ser iguales',
        type: 'error',
        confirmButtonText: 'Ok',
      });
      return false;
    }
    this.user.recoverPassword(this.username, this.usuario.password).subscribe(data => {
      Swal.fire({
        title: 'Su contraseña ha sido modificada',
        type: 'success',
        confirmButtonText: 'Ok'
      }).then(() => {
        const usr = {
          correo: '',
          password: ''
        };
        usr.correo = this.username;
        usr.password = this.usuario.password;
        this.user.login(usr).subscribe( (d: any) => {
        Swal.close();
        if (d['userType'] === 'specialist') {
          this.router.navigateByUrl('/especialist');
        } else if (d['userType'] === 'administrator') {
          this.router.navigateByUrl('/admon');
        }
      }, (errorService) => {
        Swal.fire({
          title: 'Error!',
          text: errorService.error.error,
          type: 'error',
          confirmButtonText: 'Ok',
        });
      });
      });
    }, ( errorService ) => {
      Swal.fire({
        title: 'Error!',
        text: errorService.error.error,
        type: 'error',
        confirmButtonText: 'Ok'
      }).then(() => {
        this.router.navigateByUrl('/home');
      });
    });
  }
}
