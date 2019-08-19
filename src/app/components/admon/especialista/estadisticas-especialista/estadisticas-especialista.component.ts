import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectChapterComponent } from '../../../shared/chapter/select-chapter/select-chapter.component';
import { SelectShipmentComponent } from '../../../shared/shipment/select-shipment/select-shipment.component';
import { ShipmentService } from 'src/app/services/shipment/shipment.service';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { SubshipmentService } from '../../../../services/subshipment/subshipment.service';
import { SectionService } from '../../../../services/section/section.service';




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

  id_chapter: number;
  id_shipment: number;
  shipmentID: string;
  searchButton: boolean;


  constructor(private shipment: ShipmentService, private subshipment: SubshipmentService, private section: SectionService) {


  }

  ngOnInit() {
    //console.log("Aca"+this.childOne.SelectedChapter);
   // console.log("Here"+this.SelectedChapter);
  }
  changeChapter(id_chapter) {
    console.log("Changed  Chapter");
      console.log(id_chapter);
      this.id_chapter=id_chapter;


      this.shipment.getShipments(id_chapter)
            .subscribe( (data: any) => {
              console.log(data);
              this.shipments = data;
            });
            //console.log('ID'+this.shipmentID);
  }

  /*When Shipment Select is choosen */
  changeShipment(id_shipment) {
    console.log("Changed  Shipment");
      console.log(id_shipment);
      this.shipment=id_shipment;

      this.subshipment.getSubshipments(id_shipment)
            .subscribe( (data: any) => {
              console.log(data);
              this.subshipments = data;
            });


  }

  changesubShipment(id_subShipment) {
    console.log("Changed  Subshipment");
    console.log(id_subShipment);

    this.section.getSections(id_subShipment)
          .subscribe( (data: any) => {
            console.log(data);
            this.sections = data;
          });



  }

}
