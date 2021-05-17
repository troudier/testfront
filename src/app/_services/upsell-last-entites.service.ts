import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class UpsellLastEntitesService {
    constructor(
        public  router: Router
    ) { }

    public aStorage = [];
    public observable: Observable<any>;

    /**
     * @param uuid uuid
     * @param entity info entité
     */
    public setItem(uuid, entity): void {
        this.getItems().subscribe((data) => {
            if (data) {
                this.aStorage = JSON.parse(data);
            }
        });
        const type = entity.type;
        let libelle = '';
        switch (entity.type) {
            case 'physique' :
                libelle = entity.prenom + ' ' + entity.nom;
                break;
            case 'morale' :
                libelle = entity.raisonSociale;
                break;
            case 'lien' :
                libelle = entity.prenom + ' ' + entity.nom + ' (' + entity.raisonSociale + ') ';
                break;
        }

        // On cherche si l'item est déjà présent dans localStorage
        let oItem = null;
        let i = 0;
        this.aStorage.map((item, index) => {
            if (item.uuid === uuid){
                oItem = item;
                i = index;
            }
        });
        if (oItem === null) {
            // si pas présent : on l'ajoute
            this.aStorage.push({uuid: uuid, libelle : libelle, type: type});
        } else {
            // si présent : on l'update
            this.aStorage[i] = {uuid: uuid, libelle : libelle, type: type};
        }

        localStorage.setItem('upsellLastEntities', JSON.stringify(this.aStorage));
    }

    /**
     * Permet de récupérer les item du local storage
     */
    public getItems(): Observable<any> {
        const aStorage = localStorage.getItem('upsellLastEntities');
        return new Observable(observer => {
            observer.next(aStorage);
            observer.complete();
        });
    }
    /**
     * Permet de supprimer un item selon l'item clické
     * @param uuid uuid
     */
    public supprimerItem(uuid): void {
        const items = JSON.parse(localStorage.getItem('upsellLastEntities'));
        items.forEach((item, index) => {
            if (uuid === item.uuid) {
                delete items[index];
                const itemFiltered = items.filter((el) => {
                    return el != null;
                });
                return localStorage.setItem('upsellLastEntities', JSON.stringify(itemFiltered));
            }
        });
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['repertoire']).then(err => {
            console.log('erreur :' + err);
        });
    }

    /**
     * mouvement vers la droite
     */
    public scrollRight(el: HTMLElement): void {
        el.scrollTo({ left: (el.scrollLeft + 150), behavior: 'smooth' });
    }

    /**
     * mouvement vers la gauche
     */
    public scrollLeft(el: HTMLElement): void {
        el.scrollTo({ left: (el.scrollLeft - 150), behavior: 'smooth' });
    }
}
