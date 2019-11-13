import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user/user.service';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import Swal from "sweetalert2";

@Component({
  selector: 'app-modify-info-user',
  templateUrl: './modify-info-user.component.html',
  styleUrls: ['./modify-info-user.component.css']
})
export class ModifyInfoUserComponent implements OnInit {

  correo: string;
  nombre: string;
  apellidos: string;
  password: string;
  userForm = this.fb.group({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    password2: new FormControl( )
  });




  constructor( private fb: FormBuilder, private user: UserService) { }

  ngOnInit() {
    this.correo = localStorage.getItem('correo');
    this.nombre = localStorage.getItem('nombre');
    this.apellidos = localStorage.getItem('apellidos');
    this.userForm.controls['password2'].setValidators([
      Validators.required,
      this.noIgual.bind(this.userForm)
    ]);

    this.userForm.controls['name'].setValue(this.nombre);
    this.userForm.controls['surname'].setValue(this.apellidos);


  }

  noIgual(control: FormControl ): { [s:string]:boolean } {
    // console.log(this);
    let forma:any = this;

    if( control.value !== forma.controls['password'].value ) {
      console.log(control.value);

      return {
        noiguales:true
      }
    }

    return null;
  }


  modifyInfoUser() {
    console.log(this.userForm);
    this.user.modify(this.userForm.controls['name'].value, this.userForm.controls['surname'].value, this.userForm.controls['password'].value)
      .subscribe( (data: any) => {
        console.log(data);
        localStorage.setItem('nombre', this.userForm.controls['name'].value);
        localStorage.setItem('apellidos', this.userForm.controls['surname'].value);

        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });

        Toast.fire({
          type: 'success',
          title: 'Usuario actualizado correctamente'
        });


      },( errorService ) => {
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

        if( errorService.status === 400) {

          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
          });

          Toast.fire({
            type: 'warning',
            title: 'El usuario no existe'
          });

        }




      });
  }

}
