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
  selector: 'app-simulator',
  templateUrl: './simulator.page.html',
  styleUrls: ['./simulator.page.scss'],
})
export class SimulatorPage implements OnInit {
	 simlist;
	 truncBalance;
	 truncCost;
	 dailyMove;
	 simcost;
	 simBalance;
	 total = 0;
	 test = 90;
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
    quantity:''
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


        const citiesRef = firebase.firestore().collection('Users');
        const snapshot = await citiesRef.get();
        snapshot.forEach((doc) => {
          temp.push(doc.data().simbalance);
        });

        console.log(temp)
       
      
        //this.dailyMove = 0;
     await firebase.firestore().collection("Users").doc(firebase.auth().currentUser.uid)
    .onSnapshot(async (doc) => {
    	//this.dailyMove = 0;
    	self.simlist = await doc.data()
        self.simBalance = await self.simlist.simbalance
        this.truncBalance = await self.simlist.simbalance.toFixed(2)
        
        self.simcost = await self.simlist.simcost
        self.truncCost = await self.simlist.simcost.toFixed(2)

        self.simlist = await self.simlist.simlist
        this.simlist.forEach(async function(stock){
  		self.total+=stock.price
  		
  		self.dailyMove += parseFloat(stock.move)*parseInt(stock.quantity);

  		const updateRef = self.afs.collection('Users').doc(firebase.auth().currentUser.uid);
    updateRef.update({
      dailyMove: self.dailyMove,
      
    });


  	})  
  });
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





  async addStockToSim (s:string) {

   	var self = this
    var symbol = s
    this.stock.ticker = s;
    let url = `https://financialmodelingprep.com/api/v3/quote/`+symbol+`?apikey=08931942e38ee3d90b82154c5b6d50a6`;
    await this.http.get(url).subscribe(async data => {
     
      this.stock.price= await data[0].price
      
      this.stock.move = await data[0].change
      
      if(this.simBalance>=this.stock.price){
     
   
       // returns correct data
    
    console.log(await this.stock.price)
    var symbol = this.stock.ticker;
    this.url = `https://financialmodelingprep.com/api/v3/quote/`+symbol+`?apikey=08931942e38ee3d90b82154c5b6d50a6`;
   	var contains = false;

   	this.simlist.forEach(function(stock){
   		console.log(stock.ticker + " and " + s)
   		if(stock.ticker === s){
   			contains = true
   			stock.quantity +=1
   		}
   	})




   if(!contains) {
   	this.stock.quantity = 1;
  
const updateRef = this.afs.collection('Users').doc(firebase.auth().currentUser.uid);
    updateRef.update({
      simlist: firebase.firestore.FieldValue.arrayUnion(this.stock),
      simcost:this.simcost+this.stock.price,
      
      simbalance:this.simBalance - parseFloat(this.stock.price)
    });
   this.simBalance = this.simBalance- parseFloat(this.stock.price)
   
   this.simcost += this.stock.price
   }

   else {

   	console.log(this.stock.quantity)
   //	this.stock.quantity = this.stock.quantity +1

   	const updateRef = this.afs.collection('Users').doc(firebase.auth().currentUser.uid);
    updateRef.update({
    	simlist:this.simlist,
      
      simcost:this.simcost+this.stock.price,
      
      simbalance:this.simBalance - parseFloat(this.stock.price)
    });
    console.log(this.stock)
   this.simBalance = this.simBalance- parseFloat(this.stock.price)
   
   this.simcost += this.stock.price

   }
}

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

  sellStock(stock:Stock){
  	var self = this

    console.log("removed")
   
      //this.fbService.sell(stock)
      var index = this.simlist.findIndex(i => stock.ticker === i.ticker);
      //var tempBalance = this.simBalance + parseInt(this.simlist[index].quantity)*parseFloat(this.simlist[index].price)
      var tempBalance = this.simBalance + stock.price
      var tempQuantity = parseInt(this.simlist[index].quantity) -1

      //this.simlist.splice(index, 1)

      if(tempQuantity>0){
      	self.simlist[index].quantity = tempQuantity

      const updateRef = this.afs.collection('Users').doc(firebase.auth().currentUser.uid);
    updateRef.update({
      simlist: self.simlist,
      simcost:self.simcost - parseFloat(stock.price),
      
      simbalance:tempBalance
    });
}

else{

	this.simlist.splice(index, 1)

      const updateRef = this.afs.collection('Users').doc(firebase.auth().currentUser.uid);
    updateRef.update({
      simlist: self.simlist,
      simcost:self.simcost - parseFloat(stock.price),
      
      simbalance:tempBalance
    });

   

  }
}

  getTotal(){
  	var running = 0;
  	this.simlist.forEach(function(stock){
  		running=+stock.price

  	})
  }

  goToBoard(){

  }


}
