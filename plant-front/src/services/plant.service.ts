import { Injectable } from '@angular/core';
import { IPlant, Plant } from '../models/plant';
import { IUserPlant, UserPlant } from '../models/userPlant';
import { IQuestion, Question } from '../models/question';
import { ITransaction, Transaction } from '../models/transaction';
import { HttpClient } from '@angular/common/http';
import { Constants } from 'src/constants';
import { GenericResponse } from 'src/app/core/models/generic-response';
import { ResponseStatus } from 'src/app/core/enums/response-status';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  private serviceUrl: string;

  constructor(private http: HttpClient) {
    this.serviceUrl = Constants.baseURl + Constants.plantServiceUrl;
  }

  getAll(): Observable<Plant[]> {
    const url = this.serviceUrl;

    return this.http
    .get<GenericResponse<IPlant[]>>(url)
    .pipe(
      map(response => response.Data.map(json => new Plant(json)))
    );
  }

  getOne(id: number): Observable<Plant> {
    const url = this.serviceUrl + id;

    return this.http
    .get<GenericResponse<IPlant>>(url)
    .pipe(
      map(response => new Plant(response.Data))
    );
  }

  getCares(id: number): Observable<UserPlant[]> {
    const url = this.serviceUrl + id + '/plantcares';

    return this.http
    .get<GenericResponse<IUserPlant[]>>(url)
    .pipe(
      map(response => response.Data.map(json => new UserPlant(json)))
    );
  }

  getPlantQuestions(id: number): Observable<Question[]> {
    const url = this.serviceUrl + id + '/questions';

    return this.http
    .get<GenericResponse<IQuestion[]>>(url)
    .pipe(
      map(response => response.Data.map(json => new Question(json)))
    );

  }

  getPlantTransactions(id: number): Observable<Transaction[]> {
    const url = this.serviceUrl + id + '/transactions';

    return this.http
    .get<GenericResponse<ITransaction[]>>(url)
    .pipe(
      map(response => response.Data.map(json => new Transaction(json)))
    );
  }

  createPlant(plant: Plant): Observable<Plant> {
    const url = this.serviceUrl;
    const body = {
      plant
    };

    return this.http.post<GenericResponse<IPlant>>(url, body)
    .pipe(
      map(response => new Plant(response.Data))
    )
  }

  updatePlant(plant: Plant): Observable<boolean> {
    const url = this.serviceUrl + plant.Id;
    const body = {
      plant: plant
    };

    return this.http.put<GenericResponse<boolean>>(url, body)
    .pipe(
      map(response => response.Data)
    );
  }

  deletePlant(id: number): Observable<boolean> {
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
