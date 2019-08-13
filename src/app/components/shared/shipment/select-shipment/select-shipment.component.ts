import { Component, OnInit, Input } from '@angular/core';
import { ShipmentService } from 'src/app/services/shipment/shipment.service';

@Component({
  selector: 'app-select-shipment',
  templateUrl: './select-shipment.component.html',
  styleUrls: ['./select-shipment.component.css']
})
export class SelectShipmentComponent implements OnInit {
  @Input() id: string;
  shipments: any[] = [];

  constructor(private shipment: ShipmentService) {

      this.shipment.getShipments('75')
            .subscribe( (data: any) => {
              this.shipments = data;
            });
   }

  ngOnInit() {
  }

}
