import { Component, OnInit} from '@angular/core';
import {FirebaseService} from '../services/firebase.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastController} from '@ionic/angular';
// import {Stock} from '../modal/Stock';
import { StockService } from '../stock.service';
import { Stock } from '../stock.service';
import { Observable, Subscription } from 'rxjs';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import 'firebase/auth'
import firebase from 'firebase/app'



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  providers:[HttpClientModule]
})
export class Tab1Page implements OnInit {

  search = '';
  timeout = null;
  show = false;
  searchTickers = [];
  qI:any;
  stockQuote = [];

  stocksToShow:Stock[];
  
  stocks2Show;



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

  open() {
      this.show = true;
  }
   hide() {
    this.show = false;
  }
  clear() {
    this.search = '';
  }

  url = "https://financialmodelingprep.com/api/v3/profile/AAPL?apikey=08931942e38ee3d90b82154c5b6d50a6";
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
    if(!firebase.auth().currentUser){
      console.log("here")
      self.router.navigate(["/login"])
    }

    var temp = []
     var temp2 = []

     firebase.firestore().collection("Users").doc(firebase.auth().currentUser.uid)
    .onSnapshot(async (doc) => {
      self.stocks2Show = await doc.data()
        self.stocks2Show = self.stocks2Show.watchlist

    });

  /* var userDeviceRef = this.afs.collection("Users").doc(firebase.auth().currentUser.uid);
userDeviceRef.get().toPromise().then(function(doc){
    if (doc.exists) {
        console.log("Document data:", doc.data())
        console.log("document customdata foo: " + doc.data());
        self.stocks2Show = doc.data()
        console.log(self.stocks2Show.watchlist)
        self.stocks2Show = self.stocks2Show.watchlist
    }
})*/

     //this.stocks2Show = temp;
     //this.stocksToShow = temp2;
    //this.stocks = this.stockService.getStocks();
}


  async setFinancialStatment() {
    this.http.get<any>(this.url).subscribe(data => {
      console.log(data[0].symbol);
      this.financialStatement = [data];
      console.log(this.financialStatement[0])
      console.log(data);
  })
}


  async getStockQuote (symbol) {
    let url = `https://financialmodelingprep.com/api/v3/quote/`+symbol+`?apikey=08931942e38ee3d90b82154c5b6d50a6`;

    this.http.get(url).subscribe(data => {
      console.log(data);
      this.financialStatement = data;
      // this.stockQuote = this.qI.list;
      console.log(data[0].price)
      console.log(this.financialStatement[0]); // returns correct data
    })
  }




   async addStock () {
    var symbol = this.stock.ticker;
    this.url = `https://financialmodelingprep.com/api/v3/quote/`+symbol+`?apikey=08931942e38ee3d90b82154c5b6d50a6`;
    await this.getStockQuote(symbol);
    // need to do async call to wait here until stock info is recieved
    // this.financialStatement[0] is correct data but cant figure out how to wait properly

    console.log(this.financialStatement[0]);

    // add stock to firebase
    //need to populate with data first
    this.fbService.addStock(this.stock).then((doc) => {
      console.log(doc);
      this.router.navigateByUrl('/');
    }, err => {
    });
  }


  async addStock2 (s:string) {

    var symbol = s
    this.stock.ticker = s;
    let url = `https://financialmodelingprep.com/api/v3/quote/`+symbol+`?apikey=08931942e38ee3d90b82154c5b6d50a6`;
    await this.http.get(url).subscribe(async data => {
      var stockData = await data

      this.stock.price= await stockData[0].price
      var t = await stockData[0].price
      console.log(this.stock.price)
      console.log(await stockData[0].price)

       // returns correct data

    console.log(await this.stock.price)
    var symbol = this.stock.ticker;
    this.url = `https://financialmodelingprep.com/api/v3/quote/`+symbol+`?apikey=08931942e38ee3d90b82154c5b6d50a6`;
    await this.getStockQuote(symbol);
    // need to do async call to wait here until stock info is recieved
    // this.financialStatement[0] is correct data but cant figure out how to wait properly



    // add stock to firebase
    //need to populate with data first
    this.fbService.addStock(this.stock).then((doc) => {
      console.log(doc);
      this.router.navigateByUrl('/');
    }, err => {
    });

      // returns correct data


      this.stock.name = await stockData[0].name;
      this.stock.move = await stockData[0].changesPercentage;
      this.stock.yearLow = await stockData[0].yearLow;
      this.stock.yearHigh  = await stockData[0].yearHigh;
      this.stock.exchange  = await stockData[0].exchange;
      this.stock.averageVol  = await stockData[0].avgVolume;
      this.stock.dailyVol  = await stockData[0].volume;
      this.stock.marketCap  = await stockData[0].marketCap;

      console.log(this.stock.name);
      console.log(this.stock.yearLow);
      console.log(this.stock.yearHigh);
      console.log(this.stock.exchange);
      console.log(this.stock.averageVol);
      console.log(this.stock.dailyVol);
      console.log(this.stock.marketCap);

      // add stock to firebase
      //need to populate with data first
      this.fbService.addStock(this.stock).then((doc) => {
        console.log(doc);
        this.router.navigateByUrl('/');
      }, err => { console.log("error adding to firebase");

      });

    })
  }

  getStockImage(symbol) {
    return `https://financialmodellingprep.com/images-New-jpg/${symbol.toUpperCase()}.jpg`
  }

  fetchResults(symbol, count) {
    if (!symbol) this.hide();
    this.http.get<any>(`https://financialmodelingprep.com/api/v3/search?query=${symbol}&limit=100&apikey=08931942e38ee3d90b82154c5b6d50a6`).subscribe(data =>{
      console.log(data)
      this.searchTickers = data;
    });
  }

  searchFunc(val) {
    this.search = val;
      if(val != ''){
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.show = true

        this.fetchResults(this.search, 10)

      }, 500);
  } else {
    this.clear();
    this.hide();
  }
  }

  viewStock(stock){
    this.router.navigate(['/stock-view/'+ stock.ticker]);
  }

  removeStock(id:string){
    console.log("removed")

      this.fbService.deleteStock(id)


  }
}
