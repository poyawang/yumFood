import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { WindRefService } from 'src/app/wind-ref.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  nativeWindow: any;

  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute, private windowRefService:WindRefService) {
    this.nativeWindow = windowRefService.getNativeWindow();
   }

  ngOnInit(): void {
    this.route.params.subscribe(
        (params:Params) => {
          this.recipe = this.recipeService.getRecipe(params['id']);
      }
    )
  }


  onDelete() {
    this.recipeService.deleteRecipe(this.recipe);
    this.router.navigate(['/recipe'],{ relativeTo: this.route}
     );
  }

  onCancel(){
    this.router.navigate(['/recipe'], {relativeTo: this.route})
  }

}
