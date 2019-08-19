import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShipmentService {

  constructor(private http: HttpClient) { }

  env = environment;

  httpHeaders = new HttpHeaders({
    'Content-type': 'application/json',
  });

  getShipments(id: string) {
    return this.http.get(this.env.URI + '/shipments/shipment/' + id,
    {headers: this.httpHeaders});
  }
}
