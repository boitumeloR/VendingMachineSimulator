import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { DisplayMessage, MessageModalComponent } from './modals/message-modal/message-modal.component';
import { Coin, DataService, Product, RefreshResult } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  amountTendered = 0;
  change = 0;
  displayedColumns: string[] = ['name', 'price', 'quantity', 'purchase'];

  products$: Observable<Product[]>;
  purchased$: Observable<RefreshResult>;
  products: Product[] = [];
  purchasedProduct: Product;
  loading = false;
  refreshed =  false;
  returnedCoins: Coin[] = [];
  coinPool: Coin[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Output() page: EventEmitter<PageEvent>;
  constructor(private dataServ: DataService, private dialog: MatDialog) {}
  ngOnInit(): void {
    this.readProducts(true);
  }

  appendCoinValue(coin: Coin): void {
    // Make sure pool is clear
    this.amountTendered += this.change + coin.CoinValue;
    this.change = 0;
    this.purchasedProduct = null;
    this.coinPool.push(coin);
  }

  readProducts(withLoader: boolean) {
    this.loading = withLoader;
    this.products$ = this.dataServ.GetProducts();
    this.products$.subscribe(res => {
      this.products = res.filter(prod => prod.ProductQuantity > 0);
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

  refreshProducts() {
    this.loading = true;
    this.purchased$ = this.dataServ.RefreshProducts();
    this.purchased$.subscribe(res => {
      if (res.Success) {
        this.readProducts(true);
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

  refreshAll() {
    this.refreshed = !this.refreshed;
    this.amountTendered = 0;
    this.change = 0;
    this.purchasedProduct = null;
    this.refreshProducts();
  }

  returnAllCoins() {
    this.returnedCoins = [...this.coinPool];
    this.coinPool = [];
    this.amountTendered = 0;
  }

  purchaseItem(product: Product) {
    // Decrease product quantity in api and read products
    this.change = this.amountTendered - product.ProductPrice;
    this.amountTendered = null;
    this.coinPool = [];
    this.purchased$ = this.dataServ.ReduceProductQuantity(product);
    this.purchased$.subscribe(result => {
      if (result.Success) {
        this.readProducts(false);
        this.purchasedProduct = product;
      } else {
        // Message to be displayed on the modal
        this.loading =  false;
        const display: DisplayMessage = {
          title: 'Error!',
          message: result.Message
        };
        this.dialog.open(MessageModalComponent, {
          data: { initialData: display }
        });
      }
    }, (error: HttpErrorResponse) => {
        // Message to be displayed on the modal
        this.loading =  false;
        const display: DisplayMessage = {
          title: 'Error!',
          message: 'An error occured on our servers, please tery again later.'
        };
        this.dialog.open(MessageModalComponent, {
          data: { initialData: display }
        });
    });
  }
}
