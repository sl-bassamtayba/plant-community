export interface IPlantSize {
  id: number;
  englishLabel: string;
  frenchLabel: string;
}

export class PlantSize {
  Id: number;
  EnglishLabel: string;
  FrenchLabel: string;

  constructor(input: IPlantSize) {
    this.Id = input.id;
    this.EnglishLabel = input.englishLabel;
    this.FrenchLabel = input.frenchLabel;
  }
}
