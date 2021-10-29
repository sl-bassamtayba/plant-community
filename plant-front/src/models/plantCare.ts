import {Frequency} from './frequency';
import {CareType, ICareType} from './careType';

export interface IPlantCare {
  id?: number;
  period?: number[];
  lastActionDate?: Date;
  userPlantId?: number;
  careTypeId?: number;
  careType?: ICareType;
  frequencyId?: number;
  frequency?: Frequency;
}

export class PlantCare {
  UserPlantId?: number;
  Frequency?: Frequency;
  FrequencyId?: number;
  CareType?: CareType;
  CareTypeId?: number;
  Id?: number;
  LastActionDate?: Date;
  Period?: number[];


  constructor(input: IPlantCare) {
    this.Frequency = input.frequency;
    this.FrequencyId = input.frequencyId;
    this.CareType = input.careType ? new CareType(input.careType) : undefined;
    this.CareTypeId = input.careTypeId;
    this.UserPlantId = input.userPlantId;
    this.Id = input.id;
    this.LastActionDate = input.lastActionDate;
    this.Period = input.period;
  }
}
