import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeEditComponent } from './recipe/recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe/recipe-detail/recipe-detail.component'

import { ShopComponent} from './shop/shop.component'
import { ShopEditComponent } from './shop/shop-edit/shop-edit.component';
import { ShopDetailComponent } from './shop/shop-detail/shop-detail.component';

import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
},
{
    path:'home',
    component: HomeComponent
},
{
    path: 'recipe',
    component: RecipeComponent,
    children: [
      {
          path: 'new',
          component: RecipeEditComponent
      },
      {
          path: ':id',
          component: RecipeDetailComponent
      },
      {
          path: ':id/edit',
          component: RecipeEditComponent
      }
  ]
},
{
    path: 'shop',
    component: ShopComponent,
    children: [
      {
          path: 'new',
          component: ShopEditComponent
      },
      {
          path: ':id',
          component: ShopDetailComponent
      },
      {
          path: ':id/edit',
          component: ShopEditComponent
      }
  ]
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
