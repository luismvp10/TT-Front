import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {UserService} from '../../../services/user/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {
  loading:boolean = false;
  usuario = {
    correo: ''
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
  }

  send_email( forma: NgForm ) {
    this.user.sendEmail(this.usuario.correo).subscribe(data => {
      console.log(data);
      Swal.fire({
        title: 'Se le ha enviado un correo para recuperar su contraseña',
        type: 'success',
        confirmButtonText: 'Ok'
      }).then(() => {
        this.router.navigateByUrl('/home');
      });
    }, ( errorService ) => {
      Swal.fire({
        title: 'Error!',
        text: errorService.error.error,
        type: 'error',
        confirmButtonText: 'Ok'
      });
    });
  }
}
