import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeSelectedEvent = new EventEmitter<Recipe>();
  recipeListChangedEvent = new Subject<Recipe[]>();
  maxRecipeId: number;

  startedEditing = new Subject<number>();

  recipes: Recipe[] = [];

  constructor(private http: HttpClient){

  }


  getRecipes(): Recipe[] {
    this.http.get('http://localhost:3000/recipes')
    .subscribe(
      (recipes: Recipe[])=> {
        this.recipes = recipes
        this.maxRecipeId = this.getMaxId();
        this.recipes.sort();
        this.recipeListChangedEvent.next(this.recipes.slice());
      },
      (error:any) => {
        console.log(error.message);
      }
    )
      return this.recipes.slice();
  }

  getRecipe(id: string): Recipe {
    for (let recipe of this.recipes) {
      if (recipe.id == id) {
        return recipe;
      }
    }
    return null;
  }

  getMaxId(): number {
    let maxId: number = 0;

    for (let recipe of this.recipes) {
      let currentId = +recipe.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }

    return maxId
   }

   addRecipe(recipe: Recipe) {
    if (!recipe) {
      return;
    }

    // make sure id of the new recipe is empty
    recipe.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, recipe: Recipe }>('http://localhost:3000/recipes',
    recipe,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new recipe to recipes
          this.recipes.push(responseData.recipe);
        }
      );
  }

  updateRecipe(originalRecipe: Recipe, newRecipe: Recipe) {
    if (!originalRecipe || !newRecipe) {
      return;
    }

    const pos = this.recipes.findIndex(d => d.id === originalRecipe.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new recipe to the id of the old recipe
    newRecipe.id = originalRecipe.id;
    // newRecipe._id = originalRecipe._id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.http.put('http://localhost:3000/recipes/' + originalRecipe.id,
    newRecipe, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.recipes[pos] = newRecipe;

        }
      );
  }

   deleteRecipe(recipe: Recipe) {

    if (!recipe) {
      return;
    }

    const pos = this.recipes.findIndex(d => d.id === recipe.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http.delete('http://localhost:3000/recipes/' + recipe.id)
      .subscribe(
        (response: Response) => {
          this.recipes.splice(pos, 1);
        }
      );
  }

}

