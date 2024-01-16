import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { QueryHistoryModel, QueryHistoryResponse } from './query-history.model';
import { Observable } from 'rxjs';
import { CepimResponse, PepResponse } from './query-search.model';

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  baseUrl = "https://localhost:7222/api/queryHistory";
  private pepUrl = "https://localhost:7222/api/PepCpf";
  private cepimUrl = "https://localhost:7222/api/CepimCnpj";

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, '', {
      duration: 5000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }

  insertQueryHistory(qhModel: QueryHistoryModel): Observable<QueryHistoryResponse> {
    if (qhModel.type === "CPF") {
      return this.http.post<QueryHistoryResponse>(this.baseUrl, qhModel);
    }
    else {
      return this.http.post<QueryHistoryResponse>(this.baseUrl, qhModel);
    }
  }

  readQueryHistory(): Observable<QueryHistoryResponse[]> {
    return this.http.get<QueryHistoryResponse[]>(this.baseUrl);
  }

  getPepData(cpf: string, periodoInicial: string, periodoFinal: string): Observable<PepResponse[]> {
    const params = new HttpParams()
      .set('cpf', cpf)
      .set('periodoInicial', periodoInicial)
      .set('periodoFinal', periodoFinal);
    return this.http.get<PepResponse[]>(this.pepUrl, { params });
  }

  getCepimData(cnpj: string, periodoInicial: string, periodoFinal: string): Observable<CepimResponse[]> {
    const params = new HttpParams()
      .set('cnpj', cnpj)
      .set('periodoInicial', periodoInicial)
      .set('periodoFinal', periodoFinal);
    return this.http.get<CepimResponse[]>(this.cepimUrl, { params });
  }

  validateCpf(cpf: string): boolean {
    if (cpf.length !== 11) {
      return false;
    }

    if (new Set(cpf.split('')).size === 1) {
      return false;
    }

    // Primeiro digito
    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf[i]) * (10 - i);
    }
    let primeiroDigito = 11 - (soma % 11);
    if (primeiroDigito > 9) {
      primeiroDigito = 0;
    }

    if (parseInt(cpf[9]) !== primeiroDigito) {
      return false;
    }

    // Segundo digito
    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf[i]) * (11 - i);
    }
    let segundoDigito = 11 - (soma % 11);
    if (segundoDigito > 9) {
      segundoDigito = 0;
    }

    if (parseInt(cpf[10]) !== segundoDigito) {
      return false;
    }

    // CPF válido
    return true;
  }

  validateCnpj(cnpj: string): boolean {
    if (cnpj.length !== 14) {
      return false;
    }

    if (new Set(cnpj.split('')).size === 1) {
      return false;
    }

    // Primeiro digito
    let soma = 0;
    let multiplicador = 5;
    for (let i = 0; i < 12; i++) {
      soma += parseInt(cnpj[i]) * multiplicador;
      if (multiplicador === 2) {
        multiplicador = 9;
      } else {
        multiplicador = multiplicador - 1;
      }
    }
    let primeiroDigito: number;
    if (soma % 11 < 2) {
      primeiroDigito = 0;
    } else {
      primeiroDigito = 11 - (soma % 11);
    }

    if (parseInt(cnpj[12]) !== primeiroDigito) {
      return false;
    }

    // Segundo digito
    soma = 0;
    multiplicador = 6;
    for (let i = 0; i < 13; i++) {
      soma += parseInt(cnpj[i]) * multiplicador;
      if (multiplicador === 2) {
        multiplicador = 9;
      } else {
        multiplicador = multiplicador - 1;
      }
    }
    let segundoDigito: number;
    if (soma % 11 < 2) {
      segundoDigito = 0;
    } else {
      segundoDigito = 11 - (soma % 11);
    }

    if (parseInt(cnpj[13]) !== segundoDigito) {
      return false;
    }

    // CNPJ válido
    return true;
  }
}
