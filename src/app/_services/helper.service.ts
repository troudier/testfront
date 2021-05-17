import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

const API_URL = 'http://localhost:8083/api/v1/';

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
export class HelperService {
    constructor(
        private http: HttpClient,
    ) {
    }

    getIntervenants(uuid, type): Observable<any> {
        return this.http.get(API_URL + 'intervenants/' + uuid + '/' + type);
    }

    getDictionnaire(type): Observable<any> {
        return this.http.get(API_URL + 'dictionnaire/' + type);
    }

}
