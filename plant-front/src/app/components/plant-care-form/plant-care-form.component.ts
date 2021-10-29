import { Component, Input, OnInit } from '@angular/core';
import { LoggerService } from 'src/app/core/services/logger.service';
import { CareType } from 'src/models/careType';
import { Frequency } from 'src/models/frequency';
import { PlantCare } from 'src/models/plantCare';
import { UserPlant } from 'src/models/userPlant';
import { FrequencyService } from 'src/services/frequency.service';
import { PlantCareService } from 'src/services/plant-care.service';

interface MonthValues {
  index: number;
  label: string;
  abbreviation: string;
  active: boolean;
}

class PlantCareExtented {
  PlantCare: PlantCare;
  MonthValues?: MonthValues[];

  constructor(plantCare: PlantCare) {
    this.PlantCare = plantCare;
    this.updateMonthValues();
  }

  updateMonthValues() {
    this.MonthValues = [
      { index: 1, label: 'Janvier', abbreviation: 'Janv.', active: false },
      { index: 2, label: 'Février', abbreviation: 'Fév.', active: false },
      { index: 3, label: 'Mars', abbreviation: 'Mars', active: false },
      { index: 4, label: 'Avril', abbreviation: 'April', active: false },
      { index: 5, label: 'Mai', abbreviation: 'Mai', active: false },
      { index: 6, label: 'Juin', abbreviation: 'Juin', active: false },
      { index: 7, label: 'Juillet', abbreviation: 'Juil.', active: false },
      { index: 8, label: 'Août', abbreviation: 'Août', active: false },
      { index: 9, label: 'Septembre', abbreviation: 'Sept.', active: false },
      { index: 10, label: 'Octobre', abbreviation: 'Oct.', active: false },
      { index: 11, label: 'Novembre', abbreviation: 'Nov.', active: false },
      { index: 12, label: 'Décembre', abbreviation: 'Déc.', active: false },
    ];

    const plantCarePeriod = this.PlantCare?.Period;
    if (plantCarePeriod) {
      for (const p of plantCarePeriod) {
        for (const m of this.MonthValues) {
          if (m.index === p) {
            m.active = true;
          }
        }
      }
    }
  }
}

@Component({
  selector: 'app-plant-care-form',
  templateUrl: './plant-care-form.component.html',
  styleUrls: ['./plant-care-form.component.css'],
})
export class PlantCareFormComponent implements OnInit {
  @Input() userPlant?: UserPlant;
  @Input() careTypeSelected?: CareType;
  plantCaresExtended?: PlantCareExtented[];
  frequencies?: Frequency[];
  lastActionDate?: Date;

  constructor(
    private plantCareService: PlantCareService,
    private frequencyService: FrequencyService,
    private loggerService: LoggerService
  ) {}

  ngOnInit(): void {
    if (this.userPlant && this.careTypeSelected) {
      this.plantCaresExtended = this.userPlant.PlantCares?.filter(
        (pc) => pc.CareTypeId === this.careTypeSelected?.Id
      ).map((pc) => new PlantCareExtented(pc));
    }

    this.lastActionDate = this.plantCaresExtended
      ?.map((pce) => pce.PlantCare.LastActionDate)
      .sort((a, b) => a!.valueOf() - b!.valueOf())[0];

    this.getFrequencies();
  }

  getFrequencies() {
    this.frequencyService.getAll().subscribe((result) => {
      this.frequencies = result;
    });
  }

  updateActionDate() {
    if (this.plantCaresExtended && this.lastActionDate) {
      for (const pc of this.plantCaresExtended) {
        pc.PlantCare.LastActionDate = this.lastActionDate;
        this.updatePlantCare(pc.PlantCare);
      }
    }
  }

  updatePlantCare(pc: PlantCare) {
    this.plantCareService.updatePlantCare(pc).subscribe((result) => {
      if (result) {
        this.loggerService.log('Successfully update Plant Care n°' + pc.Id);
      } else {
        this.loggerService.log('Error on update of Plant Care n°' + pc.Id);
      }
    });
  }

  updatePeriod(pce: PlantCareExtented, month: MonthValues) {
    if (month.active === true) {
      pce.PlantCare?.Period?.push(month.index);
      this.updateOtherPeriod(pce, month);
    } else {
      pce.PlantCare.Period = pce.PlantCare?.Period?.filter(
        (n) => n !== month.index
      );
    }

    this.updatePlantCare(pce.PlantCare);
  }

  updateOtherPeriod(pce: PlantCareExtented, month: MonthValues) {
    if (this.plantCaresExtended) {
      for (const plantCareExt of this.plantCaresExtended) {
        if (plantCareExt.PlantCare.Id !== pce.PlantCare.Id) {
          plantCareExt.PlantCare.Period =
            plantCareExt.PlantCare?.Period?.filter((n) => n !== month.index);
          plantCareExt.updateMonthValues();
          this.updatePlantCare(plantCareExt.PlantCare);
        }
      }
    }
  }

  updateFrequency(pce: PlantCareExtented) {
    this.updatePlantCare(pce.PlantCare);
  }

  onChangeLastActionDate(event: any) {
    this.lastActionDate = new Date(event.target.value);
    this.updateActionDate();
  }

  getLastActionDate() {
    if (this.lastActionDate) {
      const date = new Date(this.lastActionDate);
      const month =
        date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1)
          : date.getMonth() + 1;
      const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      return date.getFullYear() + '-' + month + '-' + day;
    }
    return null;
  }

  createGenericCare() {
    if (this.userPlant && this.careTypeSelected && this.frequencies) {
      const care = new PlantCare({
        lastActionDate: new Date(Date.now()),
        userPlantId: this.userPlant.Id,
        careTypeId: this.careTypeSelected.Id,
        frequencyId: this.frequencies.map((f) => f.Id)[0],
      });

      this.plantCareService.createPlantCare(care).subscribe((plantCare) => {
        this.userPlant?.PlantCares?.push(plantCare);
        this.plantCaresExtended?.push(new PlantCareExtented(plantCare));
      });
    } else {
      this.loggerService.log('Missing data to create Plant Care');
    }
  }

  deletePlantCare(plantCareExt: PlantCareExtented) {
    const id = plantCareExt.PlantCare?.Id;
    if (id) {
      this.plantCareService.deletePlantCare(id).subscribe((res) => {
        this.plantCaresExtended?.filter(
          (pce) => pce.PlantCare.Id !== plantCareExt.PlantCare.Id
        );
        this.userPlant?.PlantCares?.filter(
          (uppc) => uppc.Id !== plantCareExt.PlantCare.Id
        );
      });
    }
  }

  getMaxDate() {
    const date = new Date(Date.now());

    const month =
      date.getMonth() + 1 < 10
        ? '0' + (date.getMonth() + 1)
        : date.getMonth() + 1;
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

    return date.getFullYear() + '-' + month + '-' + day;
  }
}
