import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Shop } from '../shop.model';
import { ShopService } from "../shop.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.scss']
})
export class ShopListComponent implements OnInit {
  subscription: Subscription;

  shops: Shop[] = [];

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.subscription = this.shopService.shopListChangedEvent
      .subscribe((shopsList: Shop[]) => {
        this.shops = shopsList;
      })
      this.shopService.getShops();
  }

  onSelected(shop: Shop) {
    this.shopService.shopSelectedEvent.emit(shop);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
