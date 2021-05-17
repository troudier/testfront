import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

const API_URL = 'http://localhost:8083/api/v1/';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  constructor(private http: HttpClient) {
  }

  getTagsListe(target?, systeme?): Observable<any> {
    let options = {
    };
    if(target){
       options = {
        params: new HttpParams().set('target', target)
      };
    }else if(systeme){
       options = {
        params: new HttpParams().set('systeme', systeme)
      };
    }else if(target  && systeme){
       options = {
        params: new HttpParams().set('target', target).set('systeme', systeme)
      };
    }
    return this.http.get(API_URL + 'tags', options);
  }
}
