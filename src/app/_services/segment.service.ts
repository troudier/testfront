import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
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
export class SegmentService {
    constructor(private http: HttpClient) {
    }

    getSegmentsListe(offset, limit, recherche): Observable<any> {
        const options = offset && limit
            ?
            {
                params: new HttpParams()
                .set('offset', offset.toString())
                .set('limit', limit.toString())
                .set('recherche', recherche)
            }
            :
            {};
        return this.http.get(API_URL + 'segments', options);
    }

    getSegment(uuid): Observable<any> {
        return this.http.get(API_URL + 'segments/' + uuid);
    }

    getSegmentResultats(uuid): Observable<any> {
        return this.http.get(API_URL + 'segments/resultats/' + uuid);
    }

    getSegmentCount(uuid, index): Observable<any> {
        return this.http.get(API_URL + 'segments/count/' + uuid + '/' + index);
    }

    getSegmentCountList(uuid): Observable<any> {
        return this.http.get(API_URL + 'segments/count-list/' + uuid);
    }

    updateSegment(uuid, form): Observable<any> {
        return this.http.put(API_URL + 'segments/' + uuid, {
            segment: form,
        }, httpOptions);
    }

    getChamps(): Observable<any> {
        return this.http.get(API_URL + 'segments-champs');
    }

    getOperateurs(): Observable<any> {
        return this.http.get(API_URL + 'segments-operateurs');
    }

    calculerResultats(uuid, form): Observable<any> {
        return this.http.post(API_URL + 'segments/calculer/' + uuid, {
            segment: form
        }, httpOptions);
    }

    getSegmentLiveResultats(uuid, form): Observable<any> {
        return this.http.post(API_URL + 'segments/live-resultats/' + uuid, {
            segment: form
        }, httpOptions);
    }
}
