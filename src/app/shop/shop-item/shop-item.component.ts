import { Component, OnInit, Input } from '@angular/core';
import { Shop } from '../shop.model';

@Component({
  selector: 'app-shop-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.scss']
})
export class ShopItemComponent implements OnInit {
  @Input() shop:Shop;
  constructor() { }

  ngOnInit(): void {
  }

}
