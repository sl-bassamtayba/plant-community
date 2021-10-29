import {IUser, User} from './user';

export interface ITransactionProposal {
  id?: number;
  date?: Date;
  transactionId?: number;
  userId?: number;
  user?: IUser;
  text?: string;
  validation?: boolean;
}

export class TransactionProposal {
  Id?: number;
  TransactionId?: number;
  UserId?: number;
  User?: User;
  Date?: Date;
  Text?: string;
  Validation?: boolean;

  constructor(input: ITransactionProposal) {
    this.Date = input.date;
    this.Id = input.id;
    this.Text = input.text;
    this.TransactionId = input.transactionId;
    this.UserId = input.userId;
    this.User = input.user ? new User(input.user) : undefined;
    this.Validation = input.validation;
  }

}
