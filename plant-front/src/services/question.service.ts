import { Injectable } from '@angular/core';
import { IQuestion, Question } from '../models/question';
import { Constants } from 'src/constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GenericResponse } from 'src/app/core/models/generic-response';
import { ResponseStatus } from 'src/app/core/enums/response-status';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private serviceUrl: string;

  constructor(private http: HttpClient) {
    this.serviceUrl = Constants.baseURl + Constants.careTypeServiceUrl;
  }

  getAll(): Observable<Question[]> {
    const url = this.serviceUrl;

    return this.http
    .get<GenericResponse<IQuestion[]>>(url)
    .pipe(
      map(response => response.Data.map(json => new Question(json)))
    );
  }

  getOne(id: number): Observable<Question> {
    const url = this.serviceUrl + id;

    return this.http
    .get<GenericResponse<IQuestion>>(url)
    .pipe(
      map(response => new Question(response.Data))
    );
  }

  addReplyToQuestion(id: number, text: string): Observable<boolean> {
    const url = this.serviceUrl + id + '/reply';
    const body = {
      text
    };

    return this.http
    .post<GenericResponse<boolean>>(url, body)
    .pipe(
      map(response => response.Data)
    );
  }

  createQuestion(question: Question): Observable<Question> {
    const url = this.serviceUrl;
    const body = {
      question
    };

    return this.http.post<GenericResponse<IQuestion>>(url, body)
    .pipe(
      map(response => new Question(response.Data))
    )
  }

  updateQuestion(question: Question): Observable<boolean> {
    const url = this.serviceUrl + question.Id;
    const body = {
      question
    };

    return this.http.put<GenericResponse<boolean>>(url, body)
    .pipe(
      map(response => response.Data)
    );
  }

  deleteQuestion(id: number): Observable<boolean> {
    const url = this.serviceUrl + id;

    return this.http.delete<GenericResponse<boolean>>(url).pipe(
      map(response => {
        if(response.Status === ResponseStatus.OK)
          return response.Data || true;
        return false;
      })
    );
  }

}
