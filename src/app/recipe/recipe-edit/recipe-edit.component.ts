import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Recipe } from '../recipe.model';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {

  originalRecipe: Recipe;
  recipe:Recipe;
  editMode: boolean = false;

  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe (
      (params: Params) => {
         let id = params['id']
         if (!id){
           this.editMode = false;
           return;
         }
         this.originalRecipe = this.recipeService.getRecipe(id)

         if (!this.originalRecipe) {
           return;
         }

         this.editMode = true;
         this.recipe = JSON.parse(JSON.stringify(this.originalRecipe))

    })
  }

  onSubmit(form:NgForm){
    let value = form.value
    let newRecipe = new Recipe(null, value.foodName, value.country, value.foodImg, value.subject, value.ingredients, value.description)

    if (this.editMode) {
      this.recipeService.updateRecipe(this.originalRecipe, newRecipe)
    } else {
      this.recipeService.addRecipe(newRecipe)
    }

    this.router.navigate(['/recipe'], {relativeTo: this.route})
  }

  onCancel(){
    this.router.navigate(['/recipe'], {relativeTo: this.route})
  }

}
