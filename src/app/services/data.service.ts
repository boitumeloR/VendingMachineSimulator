import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  serverDomain = 'https://localhost:44371';
  constructor(private http: HttpClient) { }

  GetAllCoins() {

  }
}
