import { Component, OnInit, ViewChild } from '@angular/core';
import { ShipmentService } from 'src/app/services/shipment/shipment.service';
import { SubshipmentService } from '../../../../services/subshipment/subshipment.service';
import { SectionService } from '../../../../services/section/section.service';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {Chart} from 'chart.js';
import 'chartjs-plugin-zoom';
import { TransactionService } from '../../../../services/transaction/transaction.service';
import {empty, iif} from 'rxjs';
import * as $ from 'jquery';
import {SelectMonthComponent} from '../../../shared/month/select-month/select-month.component';
import { CountrieService } from '../../../../services/countrie/countrie.service';

@Component({
  selector: 'app-estadisticas-especialista',
  templateUrl: './estadisticas-especialista.component.html',
  styleUrls: ['./estadisticas-especialista.component.css']
})
export class EstadisticasEspecialistaComponent implements OnInit {
  graficaExportaDolares = [];
  graficaExportaVolumen = [];
  graficaImportaDolares = [];
  graficaImportaVolumen = [];


  datosExportaDolares = [];
  datosExportaVolumen = [];
  datosImportaDolares = [];
  datosImportaVolumen = [];
  params: any = [];
  selectedItems = [];

 loading:boolean = false;
  monthArray = [
    ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    [true, true, true, true, true, true, true, true, true, true, true, true]
  ];
  tempstatus = [false, false, false, false, false, false, false, false, false, false, false, false];
  totalExporta = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
  totalImporta = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
  SelectedChapter: string;
  // @ViewChild('chapter') childOne:SelectChapterComponent;
  @ViewChild('multiSelect') multiSelect: SelectMonthComponent;
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
  datosImporta: number = 0;
  datosExporta: number = 0;
  countries: any = [];
  operation: any;




  constructor(private shipment: ShipmentService,
              private subshipment: SubshipmentService,
              private section: SectionService,
              private transaction: TransactionService,
              private country: CountrieService) {


  }


  ngOnInit() {




  }

  changeChapter(id_chapter) {
    this.subshipments = [];
    this.sections = [];
    this.shipmentID = undefined ;
    this.subShipmentID = undefined ;
    this.sectionID = undefined ;
    console.log('Changed  Chapter');
    console.log(id_chapter);
    this.chapterID = id_chapter;
    this.shipment.getShipments(id_chapter)
      .subscribe( (data: any) => {
        console.log(data);
        this.shipments = data;
    });
    this.operation = id_chapter;
    this.country.getCountriesByOperation(this.operation, this.yearID).subscribe(
      (data: any) => {
        this.countries = data;
    });
  }

  changeShipment(id_shipment) {
    this.sections = [];
    this.subShipmentID = undefined ;
    this.sectionID = undefined ;
    console.log('Changed  Shipment');
    console.log(id_shipment);
    this.shipmentID = id_shipment;
    this.subshipment.getSubshipments(id_shipment)
      .subscribe( (data: any) => {
        console.log(data);
        this.subshipments = data;
      });
    this.operation = id_shipment;
    this.country.getCountriesByOperation(this.operation, this.yearID).subscribe(
      (data: any) => {
        this.countries = data;
    });
  }

  changesubShipment(id_subShipment) {
    this.sectionID = undefined ;
    console.log('Changed  Subshipment');
    console.log(id_subShipment);
    this.subShipmentID = id_subShipment;
    this.section.getSections(id_subShipment)
      .subscribe( (data: any) => {
        console.log(data);
        this.sections = data;
      });
    this.operation = id_subShipment;
    this.country.getCountriesByOperation(this.operation, this.yearID).subscribe(
      (data: any) => {
        this.countries = data;
    });
  }

  changeSection(id_section) {
    console.log('Changed  Section');
    console.log(id_section);
    this.sectionID = id_section;
    this.operation = id_section;
    this.country.getCountriesByOperation(this.operation, this.yearID).subscribe(
      (data: any) => {
        this.countries = data;
    });
  }


  changeCountry(id_country) {
    console.log('Changed  Country');
    console.log(id_country);
    this.countryID = id_country;
  }


  changeMonth(items) {
    this.months = [];
    this.tempstatus = [false, false, false, false, false, false, false, false, false, false, false, false];
    // this.months = items;
    console.log('Changed  Month');

    for (let i = 0; i < items.length; i++) {
     this.months.push(items[i].id_month);
     this.tempstatus[items[i].id_month - 1] = true;
    }
    console.log(this.months);
  }


  changeYear(id_year) {
    console.log('Changed  Year');
    console.log(id_year);
    this.yearID = id_year;
    if (this.operation !== undefined) {
      this.country.getCountriesByOperation(this.operation, this.yearID).subscribe(
        (data: any) => {
          this.countries = data;
      });
    }
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
  if(this.chapterID === undefined){

    Swal.fire(
      'No ha seleccionado valores',
      'Seleccione un Capítulo ',
      'warning'
    );
    return false;
  }

  if(this.months.length === 0){

    Swal.fire(
      'No ha seleccionado valores',
      'Seleccione un Mes',
      'warning'
    );
    return false;
  }



    if(this.yearID ===undefined){

      Swal.fire(
        'No ha seleccionado valores',
        'Seleccione un Año',
        'warning'
      );
      return false;
    }

    if(this.countryID===undefined){

      Swal.fire(
        'No ha seleccionado valores',
        'Seleccione un País',
        'warning'
      );
      return false;
    }






    this.datosExporta=0;
    this.datosImporta=0;
    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();
    console.log('Información para la búsqueda');
    console.log('Sección ' + this.sectionID);
    console.log('Subpartida ' + this.subShipmentID);
    console.log('Partida ' + this.shipmentID);
    console.log('Capítulo ' + this.chapterID);
    console.log('País ' + this.countryID);
    console.log('Mes ' + this.months);
    console.log(this.months);
    console.log('Año ' + this.yearID);
    this.totalExporta = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
    this.totalImporta = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
    this.graficaExportaDolares = [];
    this.graficaExportaVolumen = [];
    this.graficaImportaDolares = [];
    this.graficaImportaVolumen = [];


    this.datosExportaDolares = [];
    this.datosExportaVolumen = [];
    this.datosImportaDolares = [];
    this.datosImportaVolumen = [];
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
        Swal.close();
        this.transactions = data;

        this.graficas(this.transactions);

        /*Suma de valores totales*/
        this.transactions.forEach(element => {

          this.datosExporta = this.datosExporta + element.exports.length;
          this.datosImporta = this.datosImporta + element.imports.length;


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

  }


  showModal() {
    Swal.fire({
      title: 'Error!',
      text: 'No se puede prro',
      type: 'error',
      confirmButtonText: 'Cool'
    });
  }

  graficas(transactions) {
    // console.log(this.getRandomColor());
    transactions.forEach(element => {
 const auxExportaDolares = [];
 const auxExportaVolumen = [];
 const  auxImportaDolares = [];
 const  auxImportaVolumen = [];

      element.exports.forEach(item => {
       auxExportaDolares.push(item.price);
       auxExportaVolumen.push(item.weight);
      });

      element.imports.forEach(item => {
        auxImportaDolares.push(item.price);
        auxImportaVolumen.push(item.weight);
      });

      this.datosExportaDolares.push({
          label:  element.country,
          data: auxExportaDolares,
          fill: false,
          lineTension: 0.5,
          borderColor: this.getRandomColor(),
          borderWidth: 1
      });

      this.datosExportaVolumen.push({
        label:  element.country,
        data: auxExportaVolumen,
        fill: false,
        lineTension: 0.5,
        borderColor: this.getRandomColor(),
        borderWidth: 1
      });



      this.datosImportaDolares.push({
        label:  element.country,
        data: auxImportaDolares,
        fill: false,
        lineTension: 0.5,
        borderColor: this.getRandomColor(),
        borderWidth: 1
      });

      this.datosImportaVolumen.push({
        label:  element.country,
        data: auxImportaVolumen,
        fill: false,
        lineTension: 0.5,
        borderColor: this.getRandomColor(),
        borderWidth: 1
      });

    });



    this.graficaExportaDolares = new Chart('graficaExportaDolares', {
      type: 'bar',
      data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        datasets: this.datosExportaDolares,
      },
      options: {
        responsive: true,
        title: {
          text: 'Exportaciones - valores en dólares',
          display: true
        },
        scales: {

          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "value"
              }
            }
          ]
        },
        plugins: {
          zoom: {
            pan: {
              enabled: true,
              mode: 'x'
            },
            zoom: {
              enabled: true,
              mode: 'x'
            }
          }
        },


      }



    });

    /*Volumen exporta*/
    this.graficaExportaVolumen = new Chart('graficaExportaVolumen', {
      type: 'bar',
      data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        datasets: this.datosExportaVolumen,
      },
      options: {
        responsive: true,
        title: {
          text: 'Exportaciones - volumen',
          display: true
        },
        scales: {
          xAxes: [
            {
              ticks: {
                maxRotation: 0
              }
            }
          ],
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },



      },
      plugins: {
        zoom: {
          pan: {
            enabled: true,
            mode: 'xy',
            speed: 10,
            threshold: 10
          },
          zoom: {
            enabled: true,
            drag: false,
            mode: 'xy',
            limits: {
              max: 10,
              min: 0.5
            }
          },
        }
      },
    });


    /*Importaciones*/
    this.graficaImportaDolares = new Chart('graficaImportaDolares', {
      type: 'line',
      data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        datasets: this.datosImportaDolares,
      },
      options: {
        title: {
          text: 'Importaciones - valores en dólares',
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

    /*Volumen importa*/
    this.graficaImportaVolumen = new Chart('graficaImportaVolumen', {
      type: 'line',
      data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        datasets: this.datosImportaVolumen,
      },
      options: {
        title: {
          text: 'Importaciones - volumen',
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

 getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
