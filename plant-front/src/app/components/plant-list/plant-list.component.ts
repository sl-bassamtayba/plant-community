import { Component, OnInit } from '@angular/core';
import { Plant } from 'src/models/plant';
import { PlantService } from 'src/services/plant.service';
@Component({
  selector: 'app-plant-list',
  templateUrl: './plant-list.component.html',
  styleUrls: ['./plant-list.component.css'],
})
export class PlantListComponent implements OnInit {
  plants?: Plant[];
  searchValue: string = '';
  principalPictureLocation?: string;

  constructor(private plantService: PlantService) {}

  ngOnInit(): void {
    this.getPlants();
    this.principalPictureLocation = 'assets/images/sample-plant.png';
  }

  getPlants() {
    this.plantService.getAll().subscribe((res) => {
      this.plants = res;
    });
  }
}
