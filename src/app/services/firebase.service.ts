import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { Stock } from '../modal/Stock';
import {AngularFirestore, AngularFirestoreCollection, DocumentReference} from '@angular/fire/firestore';
import {map, take} from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private stocks: Observable<Stock[]>;
  private stockCollection: AngularFirestoreCollection<Stock>;


  usertype="";

  constructor(private afs: AngularFirestore) {
    this.stockCollection = this.afs.collection<Stock>('stocks');

    this.stocks = this.stockCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            // console.log(data)
            const id = a.payload.doc.id;
            // console.log("run after aadding new node? ")
            return { id, ...data };
          });
        })
    );
    console.log("stocks loaded...")
  }

  setUsertype(type){
    this.usertype=type;
  }

  getUsertype(){
    return this.usertype;
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
    );
  }
  addStock(stock: Stock): Promise<DocumentReference> {
    // var user1 = firebase.auth().currentUser;
    // console.log(user1.uid);
    //we can also add uid to the note here.
    return this.stockCollection.add(stock);
  }

updateStock(stock: Stock): Promise<void> {
  return this.stockCollection.doc(stock.id).update({ ticker: stock.ticker,
     price: stock.price});
}

deleteStock(id: string): Promise<void> {
  return this.stockCollection.doc(id).delete();
}
}
