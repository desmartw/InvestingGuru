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
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {



  browseList = ["TSLA", "AAPL", "MSFT", "GOOG", "GOOGL",
    "FB", "BABA", "NVDA", "BAC", "MA", "HD", "ADBE", "SPCE",
    "QS", "ARKK", "BUZZ", "TAN"]
  constructor(  private router: Router) {}


  viewStock(stock){
    this.router.navigate(['/stock-view/'+ stock.ticker]);
  }
  getStockImage(symbol) {
    return `https://financialmodellingprep.com/images-New-jpg/${symbol.toUpperCase()}.jpg`
  }

  ngOnInit() {

  }
}
