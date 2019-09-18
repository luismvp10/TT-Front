import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users-control',
  templateUrl: './users-control.component.html',
  styleUrls: ['./users-control.component.css']
})
export class UsersControlComponent implements OnInit {

  Users: any[] = [];

  constructor(private user: UserService) {
    this.getUsers();
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

  test(email) {
    console.log(email);
  }

}
