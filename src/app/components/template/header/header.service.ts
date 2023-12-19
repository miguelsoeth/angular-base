import { BehaviorSubject } from 'rxjs';
import { HeaderData } from './header-data.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private _headerData = new BehaviorSubject<HeaderData>({
    title: 'Inicio',
    icon: 'home',
    routeUrl: ''
  })

  constructor() { }

  get HeaderData(): HeaderData {
    return this._headerData.value
  }

  set HeaderData(headerData: HeaderData) {
    this._headerData.next(headerData)
  }
}
