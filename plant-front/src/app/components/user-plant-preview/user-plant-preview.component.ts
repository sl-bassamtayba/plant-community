import { Component, Input, OnInit } from '@angular/core';
import { UserPlant } from 'src/models/userPlant';

@Component({
  selector: 'app-user-plant-preview',
  templateUrl: './user-plant-preview.component.html',
  styleUrls: ['./user-plant-preview.component.css'],
})
export class UserPlantPreviewComponent implements OnInit {
  @Input() userPlant?: UserPlant;
  principalPictureLocation?: string;

  constructor() {}

  ngOnInit(): void {
    this.getPrincipalPicture();
  }

  getPrincipalPicture() {
    // TODO : refactor photos
    this.principalPictureLocation = 'assets/images/sample-plant.png';
  }
}
