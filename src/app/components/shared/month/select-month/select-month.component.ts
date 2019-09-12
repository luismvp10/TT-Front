import { Component, OnInit } from '@angular/core';
import { MonthService } from '../../../../services/month/month.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-select-month',
  templateUrl: './select-month.component.html',
  styleUrls: ['./select-month.component.css']
})
export class SelectMonthComponent implements OnInit {

  months: any[] = [];

  constructor(private month: MonthService) {

    this.month.getMonths()
        .subscribe( (data: any) => {
          this.months = data;
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

}
