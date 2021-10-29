import {Component, Input, OnInit} from '@angular/core';
import { CareType } from 'src/models/careType';
import { UserPlant } from 'src/models/userPlant';
import { CareTypeService } from 'src/services/care-type.service';

interface MonthValues {
  index: number;
  label: string;
  abbreviation: string;
  active: boolean;
}

@Component({
  selector: 'app-plant-care-view',
  templateUrl: './plant-care-view.component.html',
  styleUrls: ['./plant-care-view.component.css']
})
export class PlantCareViewComponent implements OnInit {

  @Input() userPlant?: UserPlant;
  careTypes?: CareType[];

  constructor(private careTypeService: CareTypeService) {
  }

  ngOnInit(): void {
    this.getCareTypes();
  }

  getCareTypes() {
    this.careTypeService.getAll()
      .subscribe(res => {
        this.careTypes = res;
      });
  }



}
