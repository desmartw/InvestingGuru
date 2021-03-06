import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { Stock } from '../stock.service';
import {FirebaseService} from '../services/firebase.service';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import firebase from "firebase/app"
import { StockService } from '../stock.service';

@Component({
  selector: 'app-stock-view',
  templateUrl: './stock-view.page.html',
  styleUrls: ['./stock-view.page.scss'],
})
export class StockViewPage implements OnInit {
  isPositive = true;
	stock: Stock = {
		uid:'',
    	ticker: '',
    	price: '',
    	move: '',
    	dateAdded: '',
      quantity:'',
      name:'',
      yearHigh:'',
      yearLow: '',
      exchange: '',
      averageVol: '',
      dailyVol: '',
      marketCap: '',

  };
	url = '';
	stockData:any = [];

  constructor(private fbService: FirebaseService,
    private router:Router,
    private route:ActivatedRoute,
    private http:HttpClient,
    private afs: AngularFirestore,
    public stockService: StockService
  ) { }

  ngOnInit() {
  }
  getStockImage(symbol) {
    return `https://financialmodellingprep.com/images-New-jpg/${symbol.toUpperCase()}.jpg`
  }


  async ngAfterViewInit(): Promise<void> {

    const ticker=  this.route.snapshot.paramMap.get('ticker');
      //const ticker = this.fbService.getStock(id)
      console.log(ticker)


      this.url = `https://financialmodelingprep.com/api/v3/quote/`+ticker+`?apikey=11eadd2a7d24010d2e34e43730ebe2cc`;
      this.http.get<any>(this.url).subscribe(async data => {
      	this.stock.ticker = await data[0].symbol // says undefined
        this.stock.price = await data[0].price;
        this.stock.name = await data[0].name;
        this.stock.move = await data[0].changesPercentage;
        this.stock.yearLow = await data[0].yearLow;
        this.stock.yearHigh  = await data[0].yearHigh;
        this.stock.exchange  = await data[0].exchange;
        this.stock.averageVol  = await data[0].avgVolume;
        this.stock.dailyVol  = await data[0].volume;
        this.stock.marketCap  = await data[0].marketCap;

        if(parseInt(this.stock.move) < 0 ) {
          this.isPositive = false;
        }

      	console.log(this.stock)
        console.log(data[0].symbol)

        this.stockData = [data];

    });

  }
}
