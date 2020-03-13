import { Component } from '@angular/core';
import {data} from './data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  data1 = data.datasets[0];
  data2 = data.datasets[1];
  data3 = data.datasets[2];

  constructor() {

  }


}
