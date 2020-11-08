import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DisplayMessage, MessageModalComponent } from '../modals/message-modal/message-modal.component';
import { Coin, DataService, RefreshResult } from '../services/data.service';

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

  refreshed$: Observable<RefreshResult>;
  loading = false;

  @Input() refreshed: boolean;
  @Input() returnedCoin: Coin;
  @Output() coinClicked = new EventEmitter<Coin>();
  constructor(private dataServ: DataService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.readCoins(true);
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes.refreshed) {
      const refresh = changes.refreshed.firstChange;
      if (refresh === false) {
        this.refreshCoins();
      }
    }

    if (changes.returnedCoin) {
          // Once input property changes, we refresh the coin information
    const returned = changes.returnedCoin.firstChange;
    if (returned === false) {
      this.revertCoinQuantity(this.returnedCoin);
    }
    }
  }

  readCoins(withLoading: boolean): void{
    // View loader if parameter true
    this.loading = withLoading;
    // Get coin information from api
    this.coinData$ = this.dataServ.GetAllCoins();
    this.coinData$.subscribe(data => {
      this.coinData = data;
      this.loading = false;
    }, (error: HttpErrorResponse) => {
      this.loading = false;
      const display: DisplayMessage = {
        title: 'Error!',
        message: 'An error occured on our servers, please try again later.'
      };
      this.dialog.open(MessageModalComponent, {
        data: { initialData: display }
      });
    });
  }

  refreshCoins() {
    // refresh coin quantity to possibly make more purchases
    this.loading = true;
    this.refreshed$ = this.dataServ.RefreshCoins();
    this.refreshed$.subscribe(res => {
      if (res.Success) {
        this.readCoins(false);
      } else {
        // Message to be displayed on the modal
        this.loading =  false;
        const display: DisplayMessage = {
          title: 'Error!',
          message: res.Message
        };
        this.dialog.open(MessageModalComponent, {
          data: { initialData: display }
        });
      }
    }, (error: HttpErrorResponse) => {
      this.loading = false;
      const display: DisplayMessage = {
        title: 'Error!',
        message: 'An error occured on our servers, please tery again later.'
      };
      this.dialog.open(MessageModalComponent, {
        data: { initialData: display }
      });
    });
  }

  enterCoin(enteredCoin: Coin): void {
    // minus coin quantity in database
    this.refreshed$ = this.dataServ.ReduceCoinQuantity(enteredCoin);
    this.refreshed$.subscribe(res => {
      if (res.Success) {
        this.readCoins(false);
        this.coinClicked.emit(enteredCoin);
      } else {
        const display: DisplayMessage = {
          title: 'Error!',
          message: res.Message
        };
        this.dialog.open(MessageModalComponent, {
          data: { initialData: display }
        });
      }
    });
  }

  revertCoinQuantity(coin: Coin) {
    // increase coin quantity in database
    this.refreshed$ = this.dataServ.IncreaseCoinQuantity(coin);
    this.refreshed$.subscribe(res => {
      if (res.Success) {
        this.readCoins(false);
      } else {
        const display: DisplayMessage = {
          title: 'Error!',
          message: res.Message
        };
        this.dialog.open(MessageModalComponent, {
          data: { initialData: display }
        });
      }
    });
  }
}
