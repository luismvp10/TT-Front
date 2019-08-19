import { Component, OnInit } from '@angular/core';
import { YearService } from 'src/app/services/year/year.service';

@Component({
  selector: 'app-select-year',
  templateUrl: './select-year.component.html',
  styleUrls: ['./select-year.component.css']
})
export class SelectYearComponent implements OnInit {
years: any [] = [];

  constructor(private year: YearService) {

    this.year.getYears()
        .subscribe( (data: any) => {
          this.years = data;
        });


  }

  ngOnInit() {
  }

}
