import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
// import {Stock } from "../modal/Stock"
// import { AuthService } from './auth.service';


export interface Stock {
    // UID is id of user that added stock
    uid?:any;
    // ID is unique id for stock
    id?: any;
    // Ticker is letters to ID stock i.e. APPL, TSLA, etc
    ticker: string;
    // Move is the stock's daily change
    move: string;
    // Price is current price for stock will need to use api
    price: string;
    // date added is when user added stock to watchlist
    dateAdded: any;
    name:string;
    yearHigh:string;
    yearLow: string;
    exchange:string;
    averageVol:string;
    dailyVol:string;
    marketCap:string;
  }

  @Injectable({
    providedIn: 'root'
  })
  export class StockService {

  	private stocks: Observable<Stock[]>;

  	private stockCollection: AngularFirestoreCollection<Stock>;

    constructor(private angularFirestore: AngularFirestore) {
      this.stockCollection = this.angularFirestore.collection<Stock>('stocks');


      this.stocks = this.stockCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            if (data.id == '') { data.id = id }
            return { id, ...data };
          })
        })
      )
    }
    getStocks(): Observable<Stock[]> {
      return this.stocks;
    }

    getStock(id: string): Observable<Stock> {
      return this.stockCollection.doc<Stock>(id).valueChanges().pipe(
        take(1),
        map(stock => {
          stock.id = id;
          return stock;
        })
      )
    }

}
