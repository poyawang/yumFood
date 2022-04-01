import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ShopService } from '../shop.service';
import { Shop } from '../shop.model';

@Component({
  selector: 'app-shop-edit',
  templateUrl: './shop-edit.component.html',
  styleUrls: ['./shop-edit.component.scss']
})
export class ShopEditComponent implements OnInit {
  originalShop: Shop;
  shop:Shop;
  editMode: boolean = false;

  constructor(private shopService: ShopService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe (
      (params: Params) => {
         let id = params['id']
         if (!id){
           this.editMode = false;
           return;
         }
         this.originalShop = this.shopService.getShop(id)

         if (!this.originalShop) {
           return;
         }

         this.editMode = true;
         this.shop = JSON.parse(JSON.stringify(this.originalShop))

    })
  }

  onSubmit(form:NgForm){
    let value = form.value
    let newShop = new Shop(null, value.foodName, value.foodImg, value.subject, value.price, value.location, value.size)

    if (this.editMode) {
      this.shopService.updateShop(this.originalShop, newShop)
    } else {
      this.shopService.addShop(newShop)
    }

    this.router.navigate(['/shop'], {relativeTo: this.route})
  }

  onCancel(){
    this.router.navigate(['/shop'], {relativeTo: this.route})
  }

}
