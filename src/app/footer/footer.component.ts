import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  footer = [{id:'1', socialName:'facebook', iconUrl:'https://img.icons8.com/doodle/2x/facebook-new.png'},
          {id:'2', socialName:'instagram', iconUrl:'https://img.icons8.com/doodle/2x/instagram-new.png', imgUrl:"https://www.instagram.com/"},
          {id:'3', socialName:'tiktok', iconUrl:'https://img.icons8.com/doodle/2x/tiktok--v2.png', imgUrl:"https://www.tiktok.com/"}]

  constructor() { }

  ngOnInit(): void {
  }

}
