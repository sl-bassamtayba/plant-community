import {Component, Input, OnInit} from '@angular/core';
import { Plant } from 'src/models/plant';

@Component({
  selector: 'app-plant-life-condition-view',
  templateUrl: './plant-life-condition-view.component.html',
  styleUrls: ['./plant-life-condition-view.component.css']
})
export class PlantLifeConditionViewComponent implements OnInit {

  @Input() plant?: Plant;

  constructor() { }

  ngOnInit(): void {
  }

}
