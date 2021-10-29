import { Injectable } from '@angular/core';
import {ITransaction, Transaction} from '../models/transaction';
import {ITransactionProposal, TransactionProposal} from '../models/transactionProposal';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Constants } from 'src/constants';
import { GenericResponse } from 'src/app/core/models/generic-response';
import { ResponseStatus } from 'src/app/core/enums/response-status';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private serviceUrl: string;

  constructor(private http: HttpClient) {
    this.serviceUrl = Constants.baseURl + Constants.transactionServiceUrl;
  }

  getAll(): Observable<Transaction[]> {
    const url = this.serviceUrl;

    return this.http
    .get<GenericResponse<ITransaction[]>>(url)
    .pipe(
      map(response => response.Data.map(json => new Transaction(json)))
    );
  }

  getOne(id: number): Observable<Transaction> {
    const url = this.serviceUrl + id;

    return this.http
    .get<GenericResponse<ITransaction>>(url)
    .pipe(
      map(response => new Transaction(response.Data))
    );
  }

  getTransactionProposals(id: number): Observable<TransactionProposal[]> {
    const url = this.serviceUrl + id + + '/proposals';

    return this.http
    .get<GenericResponse<ITransactionProposal[]>>(url)
    .pipe(
      map(response => response.Data.map(json => new TransactionProposal(json)))
    );
  }

  createTransaction(transaction: Transaction): Observable<Transaction> {
    const url = this.serviceUrl;
    const body = {
      transaction
    };

    return this.http.post<GenericResponse<ITransaction>>(url, body)
    .pipe(
      map(response => new Transaction(response.Data))
    )
  }

  updateTransaction(transaction: Transaction): Observable<boolean> {
    const url = this.serviceUrl + transaction.Id;
    const body = {
      transaction
    };

    return this.http.put<GenericResponse<boolean>>(url, body)
    .pipe(
      map(response => response.Data)
    );
  }

  deleteTransaction(id: number): Observable<boolean> {
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
