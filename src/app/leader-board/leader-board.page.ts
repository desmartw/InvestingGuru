import { Component, OnInit} from '@angular/core';
import {FirebaseService} from '../services/firebase.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastController} from '@ionic/angular';
// import {Stock} from '../modal/Stock';
import { StockService } from '../stock.service';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

import { Stock } from '../stock.service';
import { Observable, Subscription } from 'rxjs';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import 'firebase/auth'
import firebase from 'firebase/app'

@Component({
  selector: 'app-leader-board',
  templateUrl: './leader-board.page.html',
  styleUrls: ['./leader-board.page.scss'],
})
export class LeaderBoardPage implements OnInit {

   

leaders = []
leadersToShow = []

  private stocks: Observable<Stock[]>;
  user:any;
  stock: Stock = {
    uid: '',
    ticker: '',
    price: '',
    move:'',
    id: '',
    dateAdded: new Date().getTime(),
    quantity:'',
    name:'',
    yearHigh:'',
    yearLow: '',
    exchange: '',
    averageVol: '',
    dailyVol: '',
    marketCap: '',
  };

  

  url = "https://financialmodelingprep.com/api/v3/profile/AAPL?apikey=11eadd2a7d24010d2e34e43730ebe2cc";
  financialStatement: any=[];


  constructor(
    private activatedRoute: ActivatedRoute,
    private fbService: FirebaseService,
    private toastCtrl: ToastController,
    private router: Router,
    public stockService: StockService,
    private http:HttpClient,
    private afs: AngularFirestore
  ) {


    this.http.get<any>(this.url).subscribe(data => {
      console.log(data[0].symbol);
   
      console.log(data);

    })
  }

   async ngOnInit() {
    var self = this






        var temp = []
     var temp2 = []


        const citiesRef = firebase.firestore().collection('Users');
        const snapshot = await citiesRef.get();
        snapshot.forEach((doc) => {
          self.leaders.push(doc.data());
        });

        self.leaders.forEach(function(data){

          const o = {
    name: data.username,
    dailyMove: data.dailyMove,
    /// other properties and values
  }
          self.leadersToShow.push(o)
        })

        console.log(self.leaders)

    console.log(self.leadersToShow)

    self.leadersToShow = self.leadersToShow.sort((a, b) => (a.dailyMove > b.dailyMove)?1:-1)
    self.leadersToShow.sort((a,b) => (a.dailyMove > b.dailyMove) ? 1 : ((b.dailyMove > a.dailyMove) ? -1 : 0))
self.leadersToShow.reverse()

        console.log(self.leadersToShow)
  

  

}
}
