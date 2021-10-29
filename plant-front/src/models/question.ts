import {QuestionType} from '../enums/question-type.enum';

export interface IQuestion {
  id: number;
  date: Date;
  userID: number;
  type: QuestionType;
  plantID: number;
  title: string;
  text: string;
  isClosed: boolean;
}

export class Question {
  Date: Date;
  Id: number;
  IsClosed: boolean;
  PlantID: number;
  Text: string;
  Title: string;
  Type: QuestionType;
  UserID: number;

  constructor(input: IQuestion) {
    this.Date = input.date;
    this.Id = input.id;
    this.IsClosed = input.isClosed;
    this.PlantID = input.plantID;
    this.Text = input.text;
    this.Title = input.title;
    this.Type = input.type;
    this.UserID = input.userID;
  }
}
