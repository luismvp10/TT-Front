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

  getTransactions(params: []) {

    return this.http.get(this.env + 'transactions/transactions/',
    {headers: this.HttpHeaders});

  }
}
