import {IPlant, Plant} from './plant';
import {IUser, User} from './user';
import {IPlantSize, PlantSize} from './plantSize';
import {ITransactionType, TransactionType} from './transactionType';
import {DeliveryOption, IDeliveryOption} from './deliveryOption';

export interface ITransaction {
  id?: number;
  sellerId?: number;
  seller?: IUser;
  buyerId?: number;
  buyer?: IUser;
  plantId?: number;
  plant?: IPlant;
  transactionTypes?: ITransactionType[];
  plantSizeId?: number;
  plantSize?: IPlantSize;
  description?: string;
  locationPostalCode?: string;
  locationCity?: string;
  wish?: string;
  price?: number;
  deliveryOptions?: IDeliveryOption[];
  start?: Date;
  end?: Date;
  isClosed?: boolean;
}

export class Transaction {
  Buyer?: User;
  BuyerId?: number;
  DeliveryOptions: DeliveryOption[];
  Description?: string;
  End?: Date;
  Id?: number;
  LocationCity?: string;
  LocationPostalCode?: string;
  Plant?: Plant;
  PlantId?: number;
  PlantSize?: PlantSize;
  PlantSizeId?: number;
  Price?: number;
  Seller?: User;
  SellerId?: number;
  Start?: Date;
  TransactionTypes: TransactionType[];
  IsClosed: boolean;

  constructor(input: ITransaction) {
    this.Buyer = input.buyer ? new User(input.buyer) : undefined;
    this.BuyerId = input.buyerId;
    this.DeliveryOptions = input.deliveryOptions ? input.deliveryOptions.map(d => new DeliveryOption(d)) : [];
    this.Description = input.description;
    this.End = input.end;
    this.Id = input.id;
    this.LocationCity = input.locationCity;
    this.LocationPostalCode = input.locationPostalCode;
    this.Plant = input.plant ? new Plant(input.plant) : undefined;
    this.PlantId = input.plantId;
    this.PlantSize = input.plantSize ? new PlantSize(input.plantSize) : undefined;
    this.PlantSizeId = input.plantSizeId;
    this.Price = input.price;
    this.Seller = input.seller ? new User(input.seller) : undefined;
    this.SellerId = input.sellerId;
    this.Start = input.start;
    this.TransactionTypes = input.transactionTypes ? input.transactionTypes.map(t => new TransactionType(t)): [];
    this.IsClosed = input.isClosed || false;
  }
}
