import {IPlant, Plant} from './plant';
import {IPlantCare, PlantCare} from './plantCare';

export interface IUserPlant {
  id?: number;
  userId?: number;
  plantId?: number;
  plant?: IPlant;
  nickname?: string;
  plantCares?: IPlantCare[];
}

export class UserPlant {
  Id?: number;
  Nickname?: string;
  UserId?: number;
  Plant?: Plant;
  PlantId?: number;
  PlantCares?: PlantCare[];

  constructor(input: IUserPlant) {
    this.Id = input.id;
    this.Nickname = input.nickname;
    this.UserId = input.userId;
    this.Plant = input.plant ? new Plant(input.plant) : undefined;
    this.PlantId = input.plantId;
    this.PlantCares = input.plantCares && input.plantCares.length ? input.plantCares.map(pc => new PlantCare(pc)) : [];
  }
}
