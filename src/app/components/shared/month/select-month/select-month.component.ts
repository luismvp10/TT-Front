import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { MonthService } from '../../../../services/month/month.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-select-month',
  templateUrl: './select-month.component.html',
  styleUrls: ['./select-month.component.css']
})
export class SelectMonthComponent implements OnInit {

  months: any[] = [];
  dropdownSettings = {};
  selectedItems = [];
  @Output() valueChange = new EventEmitter();

  constructor(private month: MonthService) {

    this.month.getMonths()
      .subscribe((data: any) => {
        this.months = data;
      }, (errorService) => {

        if (errorService.status === 0) {

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

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id_month',
      textField: 'name',
      selectAllText: 'Todos',
      unSelectAllText: 'Deseleccionar todos',
      searchPlaceholderText: 'Buscar Mes',
      itemsShowLimit: 12,
      allowSearchFilter: false
    };
  }

  ngOnInit() {
  }


  onItemSelect(item: any) {
    this.valueChange.emit(this.selectedItems);
  }
  onItemDeSelect(item: any) {
    this.valueChange.emit(this.selectedItems);
  }
  onSelectAll(items: any) {
  this.valueChange.emit(items);
  }
  onDeSelectAll(items: any) {
    this.valueChange.emit(items);
  }


}
