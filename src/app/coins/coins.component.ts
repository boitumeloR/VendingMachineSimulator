import { Component, Input, OnChanges, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Coin, DataService } from '../services/data.service';

@Component({
  selector: 'app-coins',
  templateUrl: './coins.component.html',
  styleUrls: ['./coins.component.scss']
})
export class CoinsComponent implements OnInit, OnChanges {

  mockData: Coin[] = [
    { CoinID: 1, CoinQuantity: 2, CoinValue: 0.5},
    { CoinID: 1, CoinQuantity: 3, CoinValue: 1},
    { CoinID: 1, CoinQuantity: 1, CoinValue: 2},
    { CoinID: 1, CoinQuantity: 4, CoinValue: 5}
  ];
  coinData$: Observable<Coin[]>;
  coinData: Coin[];

  // @Input() bought: number;
  @Output() coinClicked = new EventEmitter<Coin>();
  constructor(private dataServ: DataService) { }

  ngOnInit(): void {
    // this.refreshCoins();
  }

  ngOnChanges() {
    // Once input property changes, we refresh the coin information
  }

  readCoins() {
    // Get coin information from api
    this.coinData$ = this.dataServ.GetAllCoins();
    this.coinData$.subscribe(data => {
      this.coinData = data;
    });
  }

  refreshCoins() {
    // refresh coin quantity to possibly make more purchases
  }

  enterCoin(enteredCoin: Coin): void {
    const coinToUpdate = this.coinData.find(c => c.CoinID === enteredCoin.CoinID);
    // minus coin quantity in database
    this.coinClicked.emit(enteredCoin);
    // this.readCoins();
  }

}
