import { ResponseStatus } from "../enums/response-status";

export interface IGenericResponse<T> {
  status: ResponseStatus;
  message: string;
  data: T;
}

export class GenericResponse<T> {

  public Status: ResponseStatus;
  public Message: string;
  public Data: T;

  constructor(json: IGenericResponse<T>) {
    this.Status = json.status;
    this.Message = json.message;
    this.Data = json.data;
	}
}




