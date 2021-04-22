import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Stock } from '../modal/Stock';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference} from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private stocks: Observable<Stock[]>;
  private stockCollection: AngularFirestoreCollection<Stock>;

  constructor(private afs: AngularFirestore) {
    this.stockCollection = this.afs.collection<Stock>('stocks');
    this.stocks = this.stockCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
    );
  }

  getStocks(): Observable<Stock[]> {
    return this.stocks;
  }
  getStock(id:String): Observable<Stock> {
    return this.stockCollection.doc<Stock>(id).valueChanges().pipe(
      take(1),
      map(stock => {
        stock.id = id;
        return stock;
      })
    );
  }

  addStock(stock:Stock): Promise<DocumentReference> {
    return this.stockCollection.add(stock);
  }
