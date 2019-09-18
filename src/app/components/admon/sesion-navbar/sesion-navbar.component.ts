import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-sesion-navbar',
  templateUrl: './sesion-navbar.component.html',
  styleUrls: ['./sesion-navbar.component.css']
})
export class SesionNavbarComponent implements OnInit {

  constructor(private user: UserService) { }

  ngOnInit() {
  }

  logout() {
    this.user.logout();
  }
}
