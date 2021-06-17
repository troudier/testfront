import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

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
export class EvenementService {

    constructor(private http: HttpClient) {
    }

    public getListeEvenements(uuid): Observable<any> {
        return this.http.get(API_URL + 'repertoire/evenements/' + uuid);
    }

    public getEvenement(uuidEvent): Observable<any> {
        return this.http.get(API_URL + 'repertoire/evenement/' + uuidEvent);
    }

    public creerEvenement(form): Observable<any> {
        return this.http.post(API_URL + 'repertoire/creer/evenement', {
            evenement: form,
        }, httpOptions);
    }

    public modifierEvenement(uuid, form): Observable<any> {
        return this.http.put(API_URL + 'repertoire/evenement/' + uuid, {
            evenement: form,
        }, httpOptions);
    }

    public desactiveEvenement(uuid): Observable<any> {
        return this.http.get(API_URL + 'desactive-evenement/' + uuid);
    }

    public validerEvenement(uuid): Observable<any> {
        return this.http.get(API_URL + 'valide-evenement/' + uuid);
    }

    public getListeTypeEvent(): Observable<any> {
        return this.http.get(API_URL + 'type-event');
    }
}
