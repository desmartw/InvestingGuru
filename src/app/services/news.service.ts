import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
const API_URL = 'https://newsapi.org/v2/';
const API_KEY = '695abe244af64452908091c695496b2c';
@Injectable({
  providedIn: 'root'
})
export class NewsService {
  currentArticle: any;
  constructor(private http: HttpClient) {}

  getData(url) {
    return this.http.get(`${API_URL}/${url}&apiKey=${API_KEY}`);
  }
}
