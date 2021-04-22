import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { Stock } from '../stock.service';

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

  constructor(private router:Router, private route:ActivatedRoute, private http:HttpClient) { }

  ngOnInit() {
  }

  async ngAfterViewInit(): Promise<void> {
    
    const ticker = this.route.snapshot.paramMap.get('ticker');
    this.url = "https://financialmodelingprep.com/api/v3/profile/" + ticker + "?apikey=11eadd2a7d24010d2e34e43730ebe2cc";
    this.http.get<any>(this.url).subscribe(data => {
    	this.stock.ticker = data[0].symbol
    	console.log(this.stock)
      console.log(data[0].symbol)
    
      this.stockData = [data];
     
    })
   
  }

}
