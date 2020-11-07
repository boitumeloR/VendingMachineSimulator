import { Component } from '@angular/core';
import { Coin } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  amountTendered = 0;
  title = 'VendingMachine';

  refreshed = 0;
  returnedCoin: Coin;

  appendCoinValue(coin: Coin): void {
    this.amountTendered += coin.CoinValue;
  }
}
