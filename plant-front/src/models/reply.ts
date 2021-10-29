export interface IReply {
  id: number;
  date: Date;
  questionId: number;
  userId: number;
  text: string;
}

export class Reply {
  Date: Date;
  Id: number;
  QuestionId: number;
  Text: string;
  UserId: number;

  constructor(input: IReply) {
    this.Date = input.date;
    this.Id = input.id;
    this.QuestionId = input.questionId;
    this.Text = input.text;
    this.UserId = input.userId;
  }
}
