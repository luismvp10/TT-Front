import { Component, OnInit } from '@angular/core';
import {ShipmentService} from "../../../services/shipment/shipment.service";
import {SubshipmentService} from "../../../services/subshipment/subshipment.service";
import {SectionService} from "../../../services/section/section.service";

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
  shipments: any = [];
  subshipments: any = [];
  sections: any = [];

  chapterID: number;
  shipmentID: number;
  subShipmentID: number;
  sectionID: number;
  countryID: string;
  monthID: string;
  yearID: number;


  constructor(private shipment: ShipmentService,
              private subshipment: SubshipmentService,
              private section: SectionService
              ) { }

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


  transacciones(){
    console.log("Información para la búsqueda");
    console.log("Sección " + this.sectionID);
    console.log("Subpartida" +this.subShipmentID);
    console.log("Partida" +this.shipmentID);
    console.log("Capítulo" +this.chapterID);
    console.log("Año " + this.yearID);
  }

}
