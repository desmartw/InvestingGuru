import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { Stock } from '../stock.service';
import {FirebaseService} from '../services/firebase.service';
import firebase from "firebase/app"

@Component({
  selector: 'app-stock-view',
  templateUrl: './stock-view.page.html',
  styleUrls: ['./stock-view.page.scss'],
})
export class StockViewPage implements OnInit {
	stock: Stock = {
		uid:'',
    	ticker: '',
    	price: '',
    	move: '',
    	dateAdded: ''
  };
	url = '';
	stockData:any = [];

  constructor(private fbService: FirebaseService, private router:Router, private route:ActivatedRoute, private http:HttpClient) { }

  ngOnInit() {
  }

  async ngAfterViewInit(): Promise<void> {

    const ticker=  this.route.snapshot.paramMap.get('ticker');
    //const ticker = this.fbService.getStock(id)
    console.log(ticker)
    

    this.url = "https://financialmodelingprep.com/api/v3/profile/" + ticker + "?apikey=11eadd2a7d24010d2e34e43730ebe2cc";
    this.http.get<any>(this.url).subscribe(data => {
    	this.stock.ticker = data[0].symbol // says undefined
      this.stock.price = data[0].price
    	console.log(this.stock)
      console.log(data[0].symbol)

      this.stockData = [data];

    })

  }

}
