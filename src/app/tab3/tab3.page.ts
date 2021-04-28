// news api key 695abe244af64452908091c695496b2c

import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';
import { Router } from '@angular/router';

import { Platform } from '@ionic/angular';
import { NavController } from '@ionic/angular';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';



@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  data: any;
  page = 1;
  constructor(private newsService: NewsService, private router: Router,
     public platform: Platform, public navCtrl: NavController,
     public iab: InAppBrowser,
   ) {}

  ngOnInit() {
    this.newsService
          .getData(
            `top-headlines?country=us&category=business&pageSize=5&page=${
              this.page
            }`
          )
          .subscribe(data => {
            console.log(data);
            this.data = data;
          });
    }

  onGoToViewNewsPage(article) {
    this.newsService.currentArticle = article;
    this.router.navigate(['/view-news']);
  }

  searchByKeyword (event) {
    this.page++;
    console.log(event);
    this.newsService.
      getData(
        `everything?q=`+ event + `&pageSize=5&page=${this.page}`
      )
      .subscribe(data => {
        this.data = data;
      });
  }

 loadMoreNews(event) {
   this.page++;
   console.log(event);
   this.newsService
     .getData(
       `top-headlines?country=us&category=business&pageSize=5&page=${this.page}`
     )
     .subscribe(data => {
       // console.log(data);
       // this.data = data;
       for (const article of data['articles']) {
         this.data.articles.push(article);
       }
       event.target.complete();
       console.log(this.data);
     });
 }

}
