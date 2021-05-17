import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
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
export class PersonneService {

    constructor(private http: HttpClient) {
    }

    getPersonnesListe(offset, limit, recherche, type, statut): Observable<any> {
        const options = offset && limit
            ?
            {
                params: new HttpParams()
                .set('offset', offset.toString())
                .set('limit', limit.toString())
                .set('recherche', recherche)
                .set('type', type)
                .set('statut', statut)
            }
            :
            {};
        return this.http.get(API_URL + 'personnes', options);
    }

    getPersonne(uuid): Observable<any> {
        return this.http.get(API_URL + 'personnes/' + uuid);
    }

    setTags(tags: string[], uuid: string): Observable<any> {
        return this.http.post(API_URL + 'personnes/tags', {
            tags,
            uuid
        }, httpOptions);
    }

    getPersonneLiens(uuid): Observable<any> {
        return this.http.get(API_URL + 'personnes/liens/' + uuid);
    }

    getPersonneChamps(uuid): Observable<any> {
        return this.http.get(API_URL + 'personnes/champs/' + uuid);
    }

    getCoordonnees(uuid): Observable<any> {
        return this.http.get(API_URL + 'personnes/coordonnees/all/' + uuid);
    }

    getCoordonneesTypes(): Observable<any> {
        return this.http.get(API_URL + 'personnes/coordonnees/types');
    }

    getAdresses(uuid): Observable<any> {
        return this.http.get(API_URL + 'personnes/adresses/all/' + uuid);
    }

    getAdressesTypes(): Observable<any> {
        return this.http.get(API_URL + 'personnes/adresses/types');
    }

    getChampsDisponbiles(target): Observable<any> {
        return this.http.get(API_URL + 'personnes/champs-disponibles/' + target);
    }

    createPersonne(form): Observable<any> {
        return this.http.post(API_URL + 'personnes', {
            personne: form,
        }, httpOptions);
    }

    createPersonnePhysique(form): Observable<any> {
        return this.http.post(API_URL + 'personnes', {
            personne: form,
        }, httpOptions);
    }

    updatePersonnePhysique(uuid, form): Observable<any> {
        return this.http.put(API_URL + 'personnes/' + uuid, {
            personne: form,
        }, httpOptions);
    }

    getListeUsers(): Observable<any> {
        return this.http.get(API_URL + 'personnes-users');
    }

    getListeIndicatifs(): Observable<any> {
        return this.http.get(API_URL + 'telephones/indicatifs');
    }

    getListeChampsCreationPP(): Observable<any> {
        return this.http.get(API_URL + 'personnes/physique/champs');
    }

    getListeChampsCreationPM(): Observable<any> {
        return this.http.get(API_URL + 'personnes/morale/champs');
    }

    getListeChampsCreationPF(): Observable<any> {
        return this.http.get(API_URL + 'personnes/fonction/champs');
    }

    getListeOrigines(): Observable<any> {
        return this.http.get(API_URL + 'origines');
    }

    getListePersonnesPhysiques(): Observable<any> {
        return this.http.get(API_URL + 'personnes/physique/select');
    }

    getListeTitres(): Observable<any> {
        return this.http.get(API_URL + 'personnes/physique/titres');
    }

    getListeStatuts(): Observable<any> {
        return this.http.get(API_URL + 'personne-statuts');
    }

    getPersonneCourante(): Observable<any> {
        return this.http.get(API_URL + 'personne-current');
    }

    // GET list select 2
    getListeFormeJuridique(): Observable<any> {
        return this.http.get(API_URL + 'personne-forme-juridique');
    }

    getListeEffectif(): Observable<any> {
        return this.http.get(API_URL + 'personne-effectif');
    }

    getListeChiffreAffaire(): Observable<any> {
        return this.http.get(API_URL + 'personne-chiffre-affaire');
    }

    getListeOrganisationParente(): Observable<any> {
        return this.http.get(API_URL + 'personne-organisation-parente');
    }
    getPersonnesSelect(type): Observable<any> {
        return this.http.get(API_URL + 'personnes-select/' + type);
    }

    getPersonnesFonctions(): Observable<any> {
        return this.http.get(API_URL + 'personnes-fonctions');
    }

    createPersonneFonction(form): Observable<any> {
        return this.http.post(API_URL + 'personne-fonction', {
            personne: form,
        }, httpOptions);
    }
}
