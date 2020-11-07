import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Coin, DataService, Product } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  amountTendered = 0;
  displayedColumns: string[] = ['name', 'price', 'quantity', 'purchase'];

  products$: Observable<Product[]>;
  products: Product[] = [];
  loading = false;
  refreshed: boolean;
  returnedCoin: Coin;
  constructor(private dataServ: DataService) {}
  ngOnInit(): void {
    this.readProducts();
  }
  appendCoinValue(coin: Coin): void {
    this.amountTendered += coin.CoinValue;
  }

  readProducts() {
    this.loading = true;
    this.products$ = this.dataServ.GetProducts();
    this.products$.subscribe(res => {
      this.products = res;
      this.loading = false;
    });
  }

  refreshAll() {
    this.refreshed = true;
    this.amountTendered = 0;
    this.readProducts();
  }
}
