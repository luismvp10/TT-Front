import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }

  env = environment;

  HttpHeaders = new HttpHeaders({
    'Content-type': 'application/json'
  });

  getTransactions(params: any= []) {
   // console.log(params[0]['section']);
// console.log(this.params);
    const section = params[0]['section'];
    const year = params[0]['year'];
    const subShipment = params[0]['subShipment'];
    const shipment = params[0]['shipment'];
    const chapter = params[0]['chapter'];
    const month = params[0]['month'];
    const country = params[0]['country'];
    let url = this.env.URI + '/transactions/transaction/';
    let m = '';
    if (section !== undefined) {
      url += section;
    } else if (subShipment !== undefined) {
      url += subShipment;
    } else if (shipment !== undefined) {
      url += shipment;
    } else {
      url += chapter;
    }
    if (country !== 'Todos') {
      url += '/country/' + country;
    }
    month.forEach(element => {
      m += '' + element + ' ';
    });
    if (m !== '0 ') {
      url += '/month/' + m;
    }
    return this.http.get(url + '/year/' + year, {headers: this.HttpHeaders});
  }

  getPrediction(country, operation, kind) {
    let url = this.env.URI  + '/transactions/prediction/operation/' + operation;
    if (country !== 'Todos') {
      url += '/country/' + country;
    }
    return this.http.get(url + '/kind/' + kind , { responseType: 'blob' });
  }
}
