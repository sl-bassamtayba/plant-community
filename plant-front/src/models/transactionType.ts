export interface ITransactionType {
  id: number;
  englishLabel: string;
  frenchLabel: string;
}

export class TransactionType {
  Id: number;
  EnglishLabel: string;
  FrenchLabel: string;

  constructor(input: ITransactionType) {
    this.Id = input.id;
    this.EnglishLabel = input.englishLabel;
    this.FrenchLabel = input.frenchLabel;
  }
}
