export class Recipe {
  public id: string;
  public foodName: string;
  public country: string;
  public foodImg: string;
  public subject: string;
  public ingredients: Array<any>;
  public description: Object;

  constructor(id:string, foodName:string, country:string, foodImg:string, subject:string, ingredients:Array<any>,description:Object) {
    this.id = id;
    this.foodName = foodName;
    this.country = country;
    this.foodImg = foodImg;
    this.subject = subject;
    this.ingredients = ingredients;
    this.description = description;
  }
}
