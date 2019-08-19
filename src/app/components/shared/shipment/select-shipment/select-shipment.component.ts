import { Component, OnInit, Input } from '@angular/core';
import { ShipmentService } from 'src/app/services/shipment/shipment.service';

@Component({
  selector: 'app-select-shipment',
  templateUrl: './select-shipment.component.html',
  styleUrls: ['./select-shipment.component.css']
})
export class SelectShipmentComponent implements OnInit {
  @Input() shipments: any[];



  constructor(private shipment: ShipmentService) {


   }

  ngOnInit() {


  }



}
