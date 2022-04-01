import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { WindRefService } from 'src/app/wind-ref.service';

import { Shop } from '../shop.model';
import { ShopService } from '../shop.service';


@Component({
  selector: 'app-shop-detail',
  templateUrl: './shop-detail.component.html',
  styleUrls: ['./shop-detail.component.scss']
})
export class ShopDetailComponent implements OnInit {
  shop: Shop;
  nativeWindow: any;

  constructor(private shopService: ShopService, private router: Router, private route: ActivatedRoute, private windowRefService:WindRefService) {
    this.nativeWindow = windowRefService.getNativeWindow();
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params) => {
          this.shop = this.shopService.getShop(params['id']);
      }
    )
  }


  onDelete() {
    this.shopService.deleteShop(this.shop);
    this.router.navigate(['/shop'],
     {relativeTo: this.route}
     );
  }

  onCancel(){
    this.router.navigate(['/shop'], {relativeTo: this.route})
  }

}
