import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  public get getUsername(): string {
    return 'ADMINISTRADOR';
  }
}
