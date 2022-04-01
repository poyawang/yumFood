export class Footer {
  public id: string;
  public socialName: string;
  public iconUrl:string;
  public imgUrl: string;
  public email: string;
  public copyRight: string;

  constructor(id: string, socialName: string, iconUrl:string, imgUrl: string, email: string, copyRight: string){
    this.id = id;
    this.socialName = socialName;
    this.iconUrl = iconUrl;
    this.imgUrl = imgUrl;
    this.email = email;
    this.copyRight = copyRight;
  }
}
