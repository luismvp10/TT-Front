import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../../../../services/user/user.service';
import Swal from 'sweetalert2';
import { FormBuilder, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-users-control',
  templateUrl: './users-control.component.html',
  styleUrls: ['./users-control.component.css']
})
export class UsersControlComponent implements OnInit {

  Users: any[] = [];
  emailpattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+[\.][a-z]{2,3}$';
  @ViewChild('adduser') adduser: ElementRef;
  ValidaPass = false;

  constructor(private fb: FormBuilder, private user: UserService) {
    this.getUsers();
    this.userForm.controls['password2'].setValidators([
      Validators.required,
      this.noIgual.bind(this.userForm)
    ]);
  }


  userForm = this.fb.group({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.pattern(this.emailpattern)]),
    password: new FormControl('', Validators.required),
    password2: new FormControl( )
   });


  noIgual(control: FormControl ): { [s:string]:boolean } {
console.log(this);
    let forma:any = this;

    if( control.value !== forma.controls['password'].value ) {
      console.log(control.value);
      this.ValidaPass = true;
      return {
        noiguales:true
      }
    }
    this.ValidaPass = false;
    return null;
  }


  getUsers() {
    this.Users = [];
    this.user.getUsers()
        .subscribe( (data: any) => {
          this.Users = data;
          this.Users.forEach(item => {
            if (item.user_type === 'specialist') {
              item.user_type = 'Especialista';
            } else {
              item.user_type = 'Administrador';
            }
          });
    }, ( errorService ) => {
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

  ngOnInit() {
  }



  deleteUser(email) {
    Swal.fire({
      title: 'Está seguro?',
      text: 'No podra revertir esta acción!',
      type: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar usuario'
    }).then((result) => {
      if (result.value) {
        this.user.delete(email)
        .subscribe( ( data: any ) => {
          if ( data.status ) {
            Swal.fire({
              type: 'success',
              title: 'El usuario ha sido eliminado exitosamente',
              showConfirmButton: true,
            });
            this.getUsers();
          }
        });
      }
    });
  }

  register( ) {
    this.user.register(this.userForm.value).subscribe(data => {
      Swal.fire({
        title: 'El usuario fue agregado exitosamente!',
        type: 'success',
        confirmButtonText: 'Ok'
      }).then(() => {
        this.adduser.nativeElement.click();
        this.getUsers();
        this.resetUserForm();
        });
    }, (errorService) => {
      Swal.fire({
        title: 'Error!',
        text: errorService.error.error,
        type: 'error',
        confirmButtonText: 'Ok'
      });
    });
  }

  get username() {
    return this.userForm.get('username');
  }

  resetUserForm() {
    this.userForm.reset();
 }


}
