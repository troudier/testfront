import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ExceptionService {

    constructor() {
    }

    statutErreur(err): string {
        if (err.status === 0) {
            return 'Pas de réponse ou temps d\'attente expiré';
        }
        if (err.status === 400 || err.status === 401) {
            return 'Requête invalide';
        }
        if (err.status === 404) {
            return 'La page demandée est introuvable';
        }
        if (err.status >= 500) {
            return 'Erreur fatale';
        }
    }
}
