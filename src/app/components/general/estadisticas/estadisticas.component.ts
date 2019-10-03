import { Component, OnInit } from '@angular/core';
import {ShipmentService} from '../../../services/shipment/shipment.service';
import {SubshipmentService} from '../../../services/subshipment/subshipment.service';
import {SectionService} from '../../../services/section/section.service';
import {TransactionService} from '../../../services/transaction/transaction.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
  shipments: any = [];
  subshipments: any = [];
  sections: any = [];
  transactions: any = [];

  chapterID: number;
  shipmentID: number;
  subShipmentID: number;
  sectionID: number;
  countryID: string = 'Todos';
  monthID: string;
  yearID: number;

  loading: boolean = false;
  datosImporta: number = 0;
  datosExporta: number = 0;

  monthArray = [
    ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    [true, true, true, true, true, true, true, true, true, true, true, true]
  ];
  tempstatus = [false, false, false, false, false, false, false, false, false, false, false, false];
  months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  totalExporta = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
  totalImporta = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

  params: any = [];


  constructor(private shipment: ShipmentService,
              private subshipment: SubshipmentService,
              private section: SectionService,
              private transaction: TransactionService) {

  }

  ngOnInit() {
  }

  changeChapter(id_chapter){

    this.subshipments = [];
    this.sections = [];

    console.log(id_chapter);
    this.chapterID = id_chapter;

    this.shipment.getShipments(id_chapter)
      .subscribe( (data: any) => {
          console.log(data);
          this.shipments = data;
      });

  }


  changeShipment(id_shipment){
    this.sections = [];
    console.log("Changed  Shipment");
    console.log(id_shipment);
    this.shipmentID=id_shipment;

    this.subshipment.getSubshipments(id_shipment)
      .subscribe( (data: any) => {
        console.log(data);
        this.subshipments = data;
      });
  }

  changesubShipment(id_subShipment){
    console.log("Changed  Subshipment");
    console.log(id_subShipment);
    this.subShipmentID = id_subShipment;

    this.section.getSections(id_subShipment)
      .subscribe( (data: any) => {
        console.log(data);
        this.sections = data;
      });
  }

  changeSection(id_section) {
    console.log("Changed  Section");
    console.log(id_section);
    this.sectionID = id_section;
  }


  changeYear(id_year) {
    console.log("Changed  Year");
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
  transacciones(){
    this.datosExporta=0;
    this.datosImporta=0;
    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();
    this.tempstatus = [true, true, true, true, true, true, true, true, true, true, true, true];
    console.log("Información para la búsqueda");
    console.log("Sección " + this.sectionID);
    console.log("Subpartida " +this.subShipmentID);
    console.log("Partida " +this.shipmentID);
    console.log("Capítulo " +this.chapterID);
    console.log("Año " + this.yearID);

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
      .subscribe( ( data: any) => {
        this.transactions = data;
        Swal.close();
        /*Suma de valores totales*/
        this.transactions.forEach(element => {

          this.datosImporta = this.datosImporta + element.imports.length;
          this.datosExporta = this.datosExporta + element.exports.length;

          element.exports.forEach(item => {
            this.totalExporta[0][item.month - 1] += item.price;
            this.totalExporta[1][item.month - 1] += item.weight;
          });
          element.imports.forEach(item => {
            this.totalImporta[0][item.month - 1] += item.price;
            this.totalImporta[1][item.month - 1] += item.weight;
          });


        });


      });

    this.params = [];

  }

}
