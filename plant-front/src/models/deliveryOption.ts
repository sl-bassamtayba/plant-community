export interface IDeliveryOption {
  id: number;
  englishLabel: string;
  frenchLabel: string;
}

export class DeliveryOption {
  Id: number;
  EnglishLabel: string;
  FrenchLabel: string;

  constructor(input: IDeliveryOption) {
    this.Id = input.id;
    this.EnglishLabel = input.englishLabel;
    this.FrenchLabel = input.frenchLabel;
  }
}
