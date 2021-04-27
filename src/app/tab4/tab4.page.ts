import { Component, OnInit} from '@angular/core';
import {FirebaseService} from '../services/firebase.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastController} from '@ionic/angular';
// import {Stock} from '../modal/Stock';
import { StockService } from '../stock.service';
import { Stock } from '../stock.service';
import { Observable, Subscription } from 'rxjs';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';


@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
  providers:[HttpClientModule]
})
export class Tab4Page implements OnInit {
  private stocks: Observable<Stock[]>;

  user:any;
  search = '';
  timeout = null;
  show = false;
  searchTickers = [];


  open() {
      this.show = true
  }
   hide() {
    this.show = false
  }
  clear() {
    this.search = ''
  }

  stock: Stock = {
    uid: '',
    ticker: '',
    price: '',
    move:'',
    id: '',
    dateAdded: new Date().getTime()
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
  ) {
    this.http.get<any>(this.url).subscribe(data => {
    console.log(data[0].symbol)
    console.log(data.symbol)
    this.financialStatement = [data];
    console.log(this.financialStatement[0])
  })
}

  ngOnInit(): void {
    this.stocks = this.stockService.getStocks();
  }


  getStockImage(symbol) {
    return `https://financialmodellingprep.com/images-New-jpg/${symbol.toUpperCase()}.jpg`
  }

  fetchResults(symbol, count) {
    if (!symbol) this.hide();
    this.http.get<any>(`https://financialmodelingprep.com/api/v3/search?query=${symbol}&limit=100&apikey=11eadd2a7d24010d2e34e43730ebe2cc`).subscribe(data =>{
      console.log(data)
      this.searchTickers = data;
    })
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
  }