import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';
import { Platform } from '@ionic/angular';
import { NavController } from '@ionic/angular';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-view-news',
  templateUrl: './view-news.page.html',
  styleUrls: ['./view-news.page.scss'],
})
export class ViewNewsPage implements OnInit {

  article;
  constructor(private newsService: NewsService,
    public platform: Platform, public navCtrl: NavController,
    public iab: InAppBrowser
  ) {}

  ngOnInit() {
    this.article = this.newsService.currentArticle;
    console.log(this.newsService.currentArticle);
  }

  viewFullArticle(url) {
    this.platform.ready().then(() => {
      const browser = this.iab.create(url);
    })
    }

}
