import { Component, OnInit } from '@angular/core';
import { Shop } from './shop.model';
import { ShopService} from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  selectedShop: Shop;

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.shopService.shopSelectedEvent
      .subscribe((shop: Shop) => {
        this.selectedShop = shop;
      })
  }

}
