import { Component, OnInit } from '@angular/core';
import { MonthService } from '../../../../services/month/month.service';

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
        });
   }

  ngOnInit() {
  }

}
