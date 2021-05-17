import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilArianeService {
  private libelleSource = new BehaviorSubject(' ');
  libelleCourrant = this.libelleSource.asObservable();

  constructor() { }

  changeLibelle(message: string): void {
    this.libelleSource.next(message);
  }

}
