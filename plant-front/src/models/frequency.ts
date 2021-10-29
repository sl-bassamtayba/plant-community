export interface IFrequency {
  id: number;
  englishLabel: string;
  frenchLabel: string;
}

export class Frequency {
  Id: number;
  EnglishLabel: string;
  FrenchLabel: string;

  constructor(input: IFrequency) {
    this.Id = input.id;
    this.EnglishLabel = input.englishLabel;
    this.FrenchLabel = input.frenchLabel;
  }
}
