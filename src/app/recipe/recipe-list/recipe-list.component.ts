import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from "../recipe.service";
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {

  subscription: Subscription;

  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.subscription = this.recipeService.recipeListChangedEvent
      .subscribe((recipesList: Recipe[]) => {
        this.recipes = recipesList;
      })
      this.recipeService.getRecipes();
  }

  onSelected(recipe: Recipe) {
    this.recipeService.recipeSelectedEvent.emit(recipe);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
