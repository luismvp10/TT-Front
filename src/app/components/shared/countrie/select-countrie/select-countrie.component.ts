import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CountrieService } from '../../../../services/countrie/countrie.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-select-countrie',
  templateUrl: './select-countrie.component.html',
  styleUrls: ['./select-countrie.component.css']
})
export class SelectCountrieComponent implements OnInit {
  @Input() countries: any[];
  @Input() isCorrect: boolean;
  constructor() {
    this.isCorrect = false;
  }

  ngOnInit() {
  }

}
