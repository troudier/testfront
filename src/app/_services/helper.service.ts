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

    importFile(form): Observable<any> {
        return this.http.post(API_URL + 'import',
            form
        );
    }
}
