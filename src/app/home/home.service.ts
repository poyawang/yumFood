import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Home } from './home.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  homeListChangedEvent = new Subject<Home[]>();
  homes = [{id:'1',name:'John',description:"this is a test", imageUrl:'https://i.imgur.com/yZFrEz4.jpeg' }]

  constructor(private http: HttpClient) { }
}
