import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {PersonneService} from '../../_services/personne.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {FilArianeService} from '../../_services/fil-ariane.service';
import {UpsellLastEntitesService} from '../../_services/upsell-last-entites.service';

@Component({
    selector: 'app-fiche',
    templateUrl: './fiche.component.html',
    styleUrls: ['./fiche.component.scss']
})
export class FicheComponent implements OnInit, OnDestroy, AfterViewInit {
    public libelle: string;
    private subscription: Subscription;
    private errorMessage = '';
    private uuid = '';
    public personne;
    public onglets;
    public tags;
    public disabled = false;
    private lastItems: string;


    constructor(
        private personneService: PersonneService,
        private route: ActivatedRoute,
        private filArianeService: FilArianeService,
        private router: Router,
        private cd: ChangeDetectorRef,
        private upsellLastEntity: UpsellLastEntitesService
    ) {
        this.subscription = this.filArianeService.libelleCourrant.subscribe(libelle => this.libelle = libelle);
        if (this.router.getCurrentNavigation() && this.router.getCurrentNavigation().extras.state) {
            this.libelle = this.getLibelle(this.router.getCurrentNavigation().extras.state);
            this.filArianeService.changeLibelle(this.libelle);
        }
    }

    ngOnInit(): void {
        this.tags = [];
        this.onglets = [];
        this.personne = '';
        this.libelle = ' ';
        this.getData(this.route.snapshot.params.id);
    }

    ngOnDestroy(): void {
        this.filArianeService.changeLibelle('');
        this.subscription.unsubscribe();
    }

    /* Récupère les données d'une fiche */
    getData(uuid): void {
        this.personneService.getPersonne(
            uuid
        ).subscribe(
            data => {
                if (this.libelle === ' ') {
                    this.libelle = this.getLibelle(data);

                    this.filArianeService.changeLibelle(this.libelle);
                }
                this.personne = data;

                this.personne.tags.map((item) => this.tags.push(item.uuid));
                if (this.personne.type !== 'morale' && this.onglets.length === 0) {
                    this.getLiens(this.personne.pp_uuid);
                }
                this.disabled = this.personne.type === 'lien';
            },
            err => {
                this.errorMessage = err.error.message;
            }
        );
    }

    /* Récupère le libellé, pour construire le fil d'ariane */
    getLibelle(personne): string {
        let libelle = '';
        if (personne.type === 'morale') {
            libelle = personne.raisonSociale + ' (' + personne.formeJuridiqueLibelle + ')';
        } else {
            libelle = personne.prenom + ' ' + personne.nom.toUpperCase();
        }
        return libelle;
    }


    /* Récupère la liste des liens pour une personne physique, pour construire les onglets */
    getLiens(uuid: string): void {
        this.personneService.getPersonneLiens(
            uuid
        ).subscribe(
            data => {
                data.map((item) => this.onglets.push(item)
                );
            },
            err => {
                this.errorMessage = err.error.message;
            }
        );
    }

    onChangeOnglet(event): void {
        this.getData(event);
    }

    toModif(uuid): void {
        this.router.navigate(['/repertoire/modifier/' + uuid]);
    }
    ngAfterViewInit(): void {
        this.cd.detectChanges();
    }
}
