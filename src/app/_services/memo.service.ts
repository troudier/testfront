import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiURL;

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json',
      accept: 'application/son'
    }
  )
};

@Injectable({
  providedIn: 'root'
})
export class MemoService {
  constructor(
    private http: HttpClient,
  ) {
  }

  add(texte: string, uuid: string, persist: boolean): Observable<any> {
    return this.http.post(API_URL + 'memos', {
      texte,
      uuid,
      persist
    }, httpOptions);
  }

}
