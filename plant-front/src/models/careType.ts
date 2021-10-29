export interface ICareType {
  id: number;
  englishLabel: string;
  frenchLabel: string;
}

export class CareType {
  Id: number;
  EnglishLabel: string;
  FrenchLabel: string;

  constructor(input: ICareType) {
    this.Id = input.id;
    this.EnglishLabel = input.englishLabel;
    this.FrenchLabel = input.frenchLabel;
  }
}
