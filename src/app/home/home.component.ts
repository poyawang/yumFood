import { Component, OnInit, Input } from '@angular/core';
import { Home} from './home.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  homes= [{id:'1',name:'Filipino Pork BBQ',description:"Filipino Pork BBQ", imageUrl:'https://i.imgur.com/41A56W8.jpg' },
          {id:'2',name:'Kimbap',description:"this is a test", imageUrl:'https://i.imgur.com/NPekyKe.jpg' },
          {id:'3',name:'Beef Salpicao',description:"Beef Salpicao", imageUrl:'https://i.imgur.com/uFmJ9no.jpg' },
          {id:'4',name:'Beef Salpicao',description:"Beef Salpicao", imageUrl:'https://i.imgur.com/q5POfCU.jpg' },
          {id:'5',name:'Beef Salpicao',description:"Beef Salpicao", imageUrl:'https://i.imgur.com/IqTFeM7.jpg' },
          {id:'6',name:'Beef Salpicao',description:"Beef Salpicao", imageUrl:'https://i.imgur.com/HZcTKIn.jpg' }]
  constructor() { }

  ngOnInit(): void {

  }


}
