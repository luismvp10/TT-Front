import { Component, OnInit, ViewChild } from '@angular/core';
import { ShipmentService } from 'src/app/services/shipment/shipment.service';
import { SubshipmentService } from '../../../../services/subshipment/subshipment.service';
import { SectionService } from '../../../../services/section/section.service';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import  Swal  from 'sweetalert2';


@Component({
  selector: 'app-estadisticas-especialista',
  templateUrl: './estadisticas-especialista.component.html',
  styleUrls: ['./estadisticas-especialista.component.css']
})
export class EstadisticasEspecialistaComponent implements OnInit {
  SelectedChapter: string;
//@ViewChild('chapter') childOne:SelectChapterComponent;
//messsage ="Hola prro";

  shipments: any[] = [];
  subshipments: any = [];
  sections: any =[]

  chapterID: number;
  shipmentID: number;
  subShipmentID: number;
  sectionID: number;
  countryID: string;
  monthID:string;
  yearID: number;


  constructor(private shipment: ShipmentService, private subshipment: SubshipmentService, private section: SectionService) {


  }

  ngOnInit() {

  }
  changeChapter(id_chapter) {
    this.subshipments = [];
    this.sections = [];

    console.log("Changed  Chapter");
      console.log(id_chapter);
      this.chapterID=id_chapter;


      this.shipment.getShipments(id_chapter)
            .subscribe( (data: any) => {
              console.log(data);
              this.shipments = data;
            });

  }


  changeShipment(id_shipment) {
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

  changesubShipment(id_subShipment) {
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


  changeCountry(id_country) {
    console.log("Changed  Country");
    console.log(id_country);
    this.countryID = id_country;
  }

  changeMonth(id_month) {
    console.log("Changed  Month");
    console.log(id_month);
    this.monthID = id_month;
  }

  changeYear(id_year) {
    console.log("Changed  Year");
    console.log(id_year);
    this.yearID = id_year;
  }


  transacciones() {
  console.log("Información para la búsqueda");
  console.log("Sección " + this.sectionID);
  console.log("País " + this.countryID);
  console.log("Mes " + this.monthID);
  console.log("Año " + this.yearID);

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
