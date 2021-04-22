import { Component, OnInit} from '@angular/core';
import {FirebaseService} from '../services/firebase.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastController} from '@ionic/angular';
// import {Stock} from '../modal/Stock';
import { StockService } from '../stock.service';
import { Stock } from '../stock.service';
import { Observable, Subscription } from 'rxjs';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  stock: Stock = {
    uid: '',
    ticker: '',
    price: '',
    id: '',
    dateAdded: new Date().getTime()
  };

  private stocks: Observable<Stock[]>;

  user:any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fbService: FirebaseService,
    private toastCtrl: ToastController,
    private router: Router,
    public stockService: StockService,
  ) {}

  ngOnInit(): void {
    this.stocks = this.stockService.getStocks();
  }
  addStock () {
    if(this.user == null) {
      //make sure logged in
      console.log("User not logged in, dont have login function yet.");
    }
    //this.stock.uid = this.user.uid;
    this.fbService.addStock(this.stock).then((doc) => {
      console.log(doc);
      this.router.navigateByUrl('/');
    }, err => {
    });
  }

  addStockToWatchlist() {
    this.fbService.addStock(this.stock).then(() => {
      this.router.navigateByUrl('/');
    }, err => {

    });
  }

}
