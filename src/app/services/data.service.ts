import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Coin {
  CoinID: number;
  CoinValue: number;
  CoinQuantity: number;
}
export interface RefreshResult {
  Success: boolean;
  Message: string;
}

export interface Product {
  ProductID: number;
  ProductName: string;
  ProductPrice: number;
  ProductQuantity: number;
}
@Injectable({
  providedIn: 'root'
})
export class DataService {

  serverDomain = 'https://vendingmachineapi.azurewebsites.net';
  constructor(private http: HttpClient) { }

  GetAllCoins(): Observable<Coin[]> {
    return this.http.get<Coin[]>(`${this.serverDomain}/api/Vending/GetCoins`);
  }
  RefreshCoins(): Observable<RefreshResult> {
    return this.http.get<RefreshResult>(`${this.serverDomain}/api/Vending/RefreshCoins`);
  }

  ReduceCoinQuantity(coin: Coin): Observable<RefreshResult> {
    return this.http.get<RefreshResult>(`${this.serverDomain}/api/Vending/ReduceCoin?CoinID= ${coin.CoinID}`);
  }

  IncreaseCoinQuantity(coin: Coin): Observable<RefreshResult> {
    return this.http.get<RefreshResult>(`${this.serverDomain}/api/Vending/IncreaseCoin?CoinID= ${coin.CoinID}`);
  }

  GetProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.serverDomain}/api/Vending/GetProducts`);
  }

  RefreshProducts(): Observable<RefreshResult> {
    return this.http.get<RefreshResult>(`${this.serverDomain}/api/Vending/RefreshProducts`);
  }

  ReduceProductQuantity(product: Product): Observable<RefreshResult> {
    return this.http.get<RefreshResult>(`${this.serverDomain}/api/Vending/ReduceProduct?ProductID=${product.ProductID}`);
  }
}
