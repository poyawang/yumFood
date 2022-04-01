import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Shop } from './shop.model'


@Injectable({
  providedIn: 'root'
})
export class ShopService {
  shopSelectedEvent = new EventEmitter<Shop>();
  shopListChangedEvent = new Subject<Shop[]>();
  maxShopId: number;

  startedEditing = new Subject<number>();

  shops: Shop[] = [];

  constructor(private http: HttpClient){

  }


  getShops(): Shop[] {
    this.http.get('http://localhost:3000/shops')
    .subscribe(
      (shops: Shop[])=> {
        this.shops = shops
        this.maxShopId = this.getMaxId();
        this.shops.sort();
        this.shopListChangedEvent.next(this.shops.slice());
      },
      (error:any) => {
        console.log(error.message);
      }
    )
      return this.shops.slice();
  }

  getShop(id: string): Shop {
    for (let shop of this.shops) {
      if (shop.id == id) {
        return shop;
      }
    }
    return null;
  }

  getMaxId(): number {
    let maxId: number = 0;

    for (let shop of this.shops) {
      let currentId = +shop.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }

    return maxId
   }

   addShop(shop: Shop) {
    if (!shop) {
      return;
    }

    // make sure id of the new shop is empty
    shop.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, shop: Shop }>('http://localhost:3000/shops',
    shop,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new shop to shops
          this.shops.push(responseData.shop);
        }
      );
  }

  updateShop(originalShop: Shop, newShop: Shop) {
    if (!originalShop || !newShop) {
      return;
    }

    const pos = this.shops.findIndex(d => d.id === originalShop.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new shop to the id of the old shop
    newShop.id = originalShop.id;
    // newshop._id = originalshop._id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.http.put('http://localhost:3000/shops/' + originalShop.id,
    newShop, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.shops[pos] = newShop;

        }
      );
  }

   deleteShop(shop: Shop) {

    if (!shop) {
      return;
    }

    const pos = this.shops.findIndex(d => d.id === shop.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http.delete('http://localhost:3000/shops/' + shop.id)
      .subscribe(
        (response: Response) => {
          this.shops.splice(pos, 1);
        }
      );
  }
}
