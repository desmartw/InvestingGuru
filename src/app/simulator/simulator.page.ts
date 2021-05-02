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
  selector: 'app-simulator',
  templateUrl: './simulator.page.html',
  styleUrls: ['./simulator.page.scss'],
})
export class SimulatorPage implements OnInit {
	 simlist;
	 simcost;
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
    dateAdded: new Date().getTime()
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
      //this.financialStatement = [data];
      //console.log(this.financialStatement[0])
      console.log(data);

    })
  }

  async ngOnInit() {

 
    var self = this
    if(!firebase.auth().currentUser){
      console.log("here")
      // self.router.navigate(["/login"])
    }

    var temp = []
     var temp2 = []
   var userDeviceRef = this.afs.collection("Users").doc(firebase.auth().currentUser.uid);
userDeviceRef.get().toPromise().then(function(doc){
    if (doc.exists) {
        console.log("Document data:", doc.data())
        console.log("document customdata foo: " + doc.data());
        self.simlist = doc.data()
        self.simcost = self.simlist.simcost
        self.simlist = self.simlist.simlist
    }
})

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
    let url = `https://financialmodelingprep.com/api/v3/quote/`+symbol+`?apikey=11eadd2a7d24010d2e34e43730ebe2cc`;

    this.http.get(url).subscribe(data => {
      console.log(data);
      this.financialStatement = data;
      // this.stockQuote = this.qI.list;
      console.log(data[0].price)
      console.log(this.financialStatement[0]); // returns correct data
    })
  }





  async addStockToSim (s:string, price:number) {
   
    var symbol = s
    this.stock.ticker = s;
    let url = `https://financialmodelingprep.com/api/v3/quote/`+symbol+`?apikey=11eadd2a7d24010d2e34e43730ebe2cc`;
    await this.http.get(url).subscribe(async data => {
     
      this.stock.price= await data[0].price
      var t = await data[0].price
      console.log(this.stock.price)
      console.log(await data[0].price)
       // returns correct data
    
    console.log(await this.stock.price)
    var symbol = this.stock.ticker;
    this.url = `https://financialmodelingprep.com/api/v3/quote/`+symbol+`?apikey=11eadd2a7d24010d2e34e43730ebe2cc`;
    await this.getStockQuote(symbol);
    // need to do async call to wait here until stock info is recieved
    // this.financialStatement[0] is correct data but cant figure out how to wait properly
const updateRef = this.afs.collection('Users').doc(firebase.auth().currentUser.uid);
    updateRef.update({
      simlist: firebase.firestore.FieldValue.arrayUnion(this.stock),
      simcost:this.simcost+this.stock.price
    });
   
   this.simcost += this.stock.price

    // add stock to firebase
    //need to populate with data first
   /* this.fbService.addStockToSim(this.stock).then((doc) => {
      console.log(doc);
    
    }, err => {
    });*/
    })
  }


  getStockImage(symbol) {
    return `https://financialmodellingprep.com/images-New-jpg/${symbol.toUpperCase()}.jpg`
  }

  fetchResults(symbol, count) {
    if (!symbol) this.hide();
    this.http.get<any>(`https://financialmodelingprep.com/api/v3/search?query=${symbol}&limit=100&apikey=11eadd2a7d24010d2e34e43730ebe2cc`).subscribe(data =>{
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

  sellStock(stock:string){
    console.log("removed")
   
      this.fbService.sell(stock)
   

  }
}
