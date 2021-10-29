export interface IUser {
  id?: number;
  name?: string;
  email?: string;
}

export class User {
  public Id?: number;
  public Name?: string;
  public Email?: string;

  constructor(input: IUser) {
    this.Id = input.id;
    this.Name = input.name;
    this.Email = input.email;
  }
}
