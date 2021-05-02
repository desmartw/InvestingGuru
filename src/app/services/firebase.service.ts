import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { Stock } from '../modal/Stock';
import {AngularFirestore, AngularFirestoreCollection, DocumentReference} from '@angular/fire/firestore';
import {map, take} from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import  firestore  from 'firebase/app';
import { Component, OnInit} from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';
import {ToastController} from '@ionic/angular';
// import {Stock} from '../modal/Stock';
import { StockService } from '../stock.service';

import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';

import 'firebase/auth'


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private stocks: Observable<Stock[]>;
  private stockCollection: AngularFirestoreCollection<Stock>;
  simcost = 0;


  usertype="";

  constructor(private afs: AngularFirestore) {

    this.stockCollection = this.afs.collection<Stock>('stocks');

    this.stocks = this.stockCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            if(a.payload.doc.data().uid!=firebase.auth().currentUser.uid) {
            const data = a.payload.doc.data();
            // console.log(data)
            const id = a.payload.doc.id;
            console.log(a.payload.doc.data().uid)
            // console.log("run after adding new node? ")
            
            return { id, ...data };
          }
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
    stock.uid = firebase.auth().currentUser.uid;
   const updateRef = this.afs.collection('Users').doc(firebase.auth().currentUser.uid);
    updateRef.update({
      watchlist: firebase.firestore.FieldValue.arrayUnion(stock)
    });
    return this.stockCollection.add(stock);
  }

  addStockToSim(stock: Stock): Promise<DocumentReference> {
    // var user1 = firebase.auth().currentUser;
    // console.log(user1.uid);
    //we can also add uid to the note here.
    var self =this
    stock.uid = firebase.auth().currentUser.uid;
   const updateRef = this.afs.collection('Users').doc(firebase.auth().currentUser.uid);
    updateRef.update({
      simlist: firebase.firestore.FieldValue.arrayUnion(stock),
      simcost:self.simcost+stock.price
    });
    return this.stockCollection.add(stock);
  }

updateStock(stock: Stock): Promise<void> {
  return this.stockCollection.doc(stock.id).update({ ticker: stock.ticker,
     price: stock.price});
}

deleteStock(id: string): Promise<void> {
  console.log(id)
  return this.stockCollection.doc(id).delete();
}

sell(id:string) {
  firebase.firestore().collection('Users').doc(firebase.auth().currentUser!.uid).get().then(document => {
    if(document.exists) {
      this.afs.collection('Users').doc(firebase.auth().currentUser!.uid).update({
        simlist: firebase.firestore.FieldValue.arrayRemove(id)
      })
    }
  })

}


}
