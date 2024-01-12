import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { QueryHistoryModel, QueryHistoryResponse } from './query-history.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QueryHistoryService {

  baseUrl = "https://localhost:7222/api/queryHistory";

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, '', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }

  insertQueryHistory(qhModel: QueryHistoryModel): Observable<QueryHistoryResponse> {
    return this.http.post<QueryHistoryResponse>(this.baseUrl, qhModel);
  }

  readQueryHistory(): Observable<QueryHistoryResponse[]> {
    return this.http.get<QueryHistoryResponse[]>(this.baseUrl)
  }
}
