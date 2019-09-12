import { Component, OnInit, ViewChild } from '@angular/core';
import { ShipmentService } from 'src/app/services/shipment/shipment.service';
import { SubshipmentService } from '../../../../services/subshipment/subshipment.service';
import { SectionService } from '../../../../services/section/section.service';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {Chart} from 'chart.js';
import { TransactionService } from '../../../../services/transaction/transaction.service';
import { iif } from 'rxjs';


@Component({
  selector: 'app-estadisticas-especialista',
  templateUrl: './estadisticas-especialista.component.html',
  styleUrls: ['./estadisticas-especialista.component.css']
})
export class EstadisticasEspecialistaComponent implements OnInit {
  title = 'Graphics with Chart.js';
  LineChart = [];
  BarChart = [];
  PieChart = [];
  params: any = [];

  monthArray = [
    ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    [true, true, true, true, true, true, true, true, true, true, true, true]
  ];
  tempstatus = [true, true, true, true, true, true, true, true, true, true, true, true];
  totalExporta = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
  totalImporta = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
  SelectedChapter: string;
  // @ViewChild('chapter') childOne:SelectChapterComponent;
  // messsage ="Hola prro";

  shipments: any = [];
  subshipments: any = [];
  sections: any = [];
  transactions: any = [];
  items: any = [];

  months = [];

  chapterID: number;
  shipmentID: number;
  subShipmentID: number;
  sectionID: number;
  countryID: string;
  monthID: string;
  yearID: number;
  loading: boolean;

  constructor(private shipment: ShipmentService,
              private subshipment: SubshipmentService,
              private section: SectionService,
              private transaction: TransactionService) {


  }

  ngOnInit() {
    this.LineChart = new Chart('lineChart', {
      type: 'line',
      data: {
      labels: [ 'Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [{
        label: 'Number of Items Sold in Months',
        data: [9, 7 , 3, 5, 2, 10, 15, 16, 19, 3, 1, 9],
        fill: false,
        lineTension: 0.2,
        borderColor: 'red',
        borderWidth: 1
      }]
      },
      options: {
        title: {
          text: 'Line Chart',
          display: true
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });

// Bar chart:
    this.BarChart = new Chart('barChart', {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [9, 7, 3, 5, 2, 10],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        title: {
          text: 'Bar Chart',
          display: true
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
             }
          }]
        }
      }
    });

  // pie chart:
    this.PieChart = new Chart('pieChart', {
      type: 'pie',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [9, 7 , 3, 5, 2, 10],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        title: {
          text: 'Bar Chart',
          display: true
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  changeChapter(id_chapter) {
    this.subshipments = [];
    this.sections = [];
    console.log('Changed  Chapter');
    console.log(id_chapter);
    this.chapterID = id_chapter;
    this.shipment.getShipments(id_chapter)
      .subscribe( (data: any) => {
        console.log(data);
        this.shipments = data;
    });
  }

  changeShipment(id_shipment) {
    this.sections = [];
    console.log('Changed  Shipment');
    console.log(id_shipment);
    this.shipmentID = id_shipment;
    this.subshipment.getSubshipments(id_shipment)
      .subscribe( (data: any) => {
        console.log(data);
        this.subshipments = data;
      });
  }

  changesubShipment(id_subShipment) {
    console.log('Changed  Subshipment');
    console.log(id_subShipment);
    this.subShipmentID = id_subShipment;
    this.section.getSections(id_subShipment)
      .subscribe( (data: any) => {
        console.log(data);
        this.sections = data;
      });
  }

  changeSection(id_section) {
    console.log('Changed  Section');
    console.log(id_section);
    this.sectionID = id_section;
  }


  changeCountry(id_country) {
    console.log('Changed  Country');
    console.log(id_country);
    this.countryID = id_country;
  }

  changeMonth(id_month) {
    this.months = [];
    console.log('Changed  Month');
    for (let i = 0, len = id_month.length; i < len; i++) {
      if (id_month[i].selected) {
        if (i === 0) {
          this.setTodos(id_month);
          break;
        } else {
          this.months.push(id_month[i].value);
          this.tempstatus[i - 1] = true;
        }
      } else {
        this.tempstatus[i - 1] = false;
      }
    }
    console.log(this.months);
  }

  // Selecciona unicamente la opcion de todos
  setTodos(months) {
    for (let i = 0, len = months.length; i < len; i++) {
      if (i === 0) {
        this.months.push(months[i].value);
        months[i].selected = true;
      } else {
        months[i].selected = false;
        this.tempstatus[i - 1] = true;
      }
    }
  }

  changeYear(id_year) {
    console.log('Changed  Year');
    console.log(id_year);
    this.yearID = id_year;
  }

  // Verifica que un pais tenga transacciones en los campos imports y exports
  countryhastransaction(country, kind) {
      if (country.imports.length < 1 && kind === 1) {
        return false;
      } else if (country.exports.length < 1 && kind === 2) {
        return false;
      }
      return true;
  }

  transacciones() {
    console.log('Información para la búsqueda');
    console.log('Sección ' + this.sectionID);
    console.log('ubpartida ' + this.subShipmentID);
    console.log('Partida ' + this.shipmentID);
    console.log('Capítulo ' + this.chapterID);
    console.log('País ' + this.countryID);
    console.log('Mes ' + this.monthID);
    console.log('Año ' + this.yearID);
    this.totalExporta = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
    this.totalImporta = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
    this.params.push({
      section: this.sectionID,
      subShipment: this.subShipmentID,
      shipment: this.shipmentID,
      chapter: this.chapterID,
      month: this.months,
      year: this.yearID,
      country: this.countryID
    });
    this.transaction.getTransactions(this.params)
      .subscribe( ( data: any ) => {
      this.transactions = data;
      /*Suma de valores totales*/
      this.transactions.forEach(element => {
        element.exports.forEach(item => {
          this.totalExporta[0][item.month - 1] += item.price;
          this.totalExporta[1][item.month - 1] += item.weight;
        });
        element.imports.forEach(item => {
          this.totalImporta[0][item.month - 1] += item.price;
          this.totalImporta[1][item.month - 1] += item.weight;
        });
      });
      let i = 0;
      this.tempstatus.forEach(item => {
        this.monthArray[1][i] = item;
        i++;
      });

    });
    this.params = [];
  //  console.log(this.transactions);
  // this.a=  this.json2array(this.transactions);



  //  a.forEach(element => {
     //  console.log(element);
    //  });

  }


  json2array(json) {
    var result = [];
    var keys = Object.keys(json);
    keys.forEach(function(key) {
      result.push(json[key]);
    });
    return result;
  }

  showModal() {
    Swal.fire({
      title: 'Error!',
      text: 'No se puede prro',
      type: 'error',
      confirmButtonText: 'Cool'
    });
  }
}
