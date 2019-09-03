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

  getTransactions(params: any=[]) {
   // console.log(params[0]['section']);
//console.log(this.params);
   var section=params[0]['section'];
   var year =params[0]['year'];
   //console.log("Here"+year);

    return this.http.get(this.env.URI+ '/transactions/transaction/'+section+'/year/'+year,
    {headers: this.HttpHeaders});

  }
}
