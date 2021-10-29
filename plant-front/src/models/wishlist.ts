import {IPlant, Plant} from './plant';
import {IUser, User} from './user';

export interface IWishList {
  id?: number;
  userId?: number;
  user?: IUser;
  plantId?: number;
  plant?: IPlant;
}

export class WishList {
  Id?: number;
  Plant?: Plant;
  PlantId?: number;
  User?: User;
  UserId?: number;

  constructor(input: IWishList) {
    this.Id = input.id;
    this.Plant = input.plant ? new Plant(input.plant): undefined;
    this.PlantId = input.plantId;
    this.User = input.user ? new User(input.user): undefined;
    this.UserId = input.userId;
  }
}
