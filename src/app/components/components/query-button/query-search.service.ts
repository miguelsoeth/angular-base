import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CepimResponse, PepResponse } from './query-search.model';

@Injectable({
  providedIn: 'root'
})
export class QuerySearchService {

  private pepUrl = "https://localhost:7222/api/PepCpf";
  private cepimUrl = "https://localhost:7222/api/CepimCnpj";

  constructor(private httpClient: HttpClient) { }

  getPepData(cpf: string, periodoInicial: string, periodoFinal: string): Observable<PepResponse[]> {
    // Construct the query parameters
    const params = new HttpParams()
      .set('cpf', cpf)
      .set('periodoInicial', periodoInicial)
      .set('periodoFinal', periodoFinal);

    console.log(`${this.pepUrl}?${params.toString()}`);
    // Make the GET request
    return this.httpClient.get<PepResponse[]>(this.pepUrl, { params });
  }

  getCepimData(cnpj: string, periodoInicial: string, periodoFinal: string): Observable<CepimResponse[]> {
    const params = new HttpParams()
      .set('cnpj', cnpj)
      .set('periodoInicial', periodoInicial)
      .set('periodoFinal', periodoFinal);
    console.log(`${this.cepimUrl}?${params.toString()}`);
    return this.httpClient.get<CepimResponse[]>(this.cepimUrl, { params });
  }
}
