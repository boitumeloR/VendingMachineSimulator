import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
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
  displayedColumns: string[] = ['name', 'price', 'quantity', 'purchase'];

  products$: Observable<Product[]>;
  purchased$: Observable<RefreshResult>;
  products: Product[] = [];
  purchasedProduct: Product;
  loading = false;
  refreshed: boolean;
  returnedCoin: Coin;
  coinPool: Coin[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private dataServ: DataService, private dialog: MatDialog) {}
  ngOnInit(): void {
    this.readProducts(true);
  }
  appendCoinValue(coin: Coin): void {
    this.coinPool.push(coin);
    this.amountTendered += coin.CoinValue;
  }

  readProducts(withLoader: boolean) {
    this.loading = withLoader;
    this.products$ = this.dataServ.GetProducts();
    this.products$.subscribe(res => {
      this.products = res.filter(prod => prod.ProductQuantity > 0);
      this.loading = false;
    });
  }

  refreshAll() {
    this.refreshed = true;
    this.amountTendered = 0;
    this.readProducts(true);
  }

  purchaseItem(product: Product) {
    // Decrease product quantity in api and read products
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
    });
  }
}
