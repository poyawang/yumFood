export class Shop {
  public id: string;
  public foodName: string;
  public foodImg: string;
  public subject: string;
  public price: string;
  public location: string;
  public size: string;

  constructor(id:string, foodName:string, foodImg:string, subject:string, price:string, location:string, size:string) {
    this.id = id;
    this.foodName = foodName;
    this.foodImg = foodImg;
    this.subject = subject;
    this.price = price;
    this.location = location;
    this.size = size;
  }
}
