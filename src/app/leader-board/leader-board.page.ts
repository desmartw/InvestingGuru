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

 

    
     


        const citiesRef = firebase.firestore().collection('Users');
        const snapshot = await citiesRef.get();
        var i = 0;
        snapshot.forEach((doc) => {
          this.leaders.push(doc.data().simbalance);
          
        });

        for(let user of this.leaders) {
        	this.leaders.push(user.username, user.dailymove)

        
    }
       
      






 
}
  

  

}
