import {AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {PersonneService} from '../../_services/personne.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {FilArianeService} from '../../_services/fil-ariane.service';
import {UpsellLastEntitesService} from '../../_services/upsell-last-entites.service';
import {EvenementService} from '../../_services/evenement.service';
import {NotifierService} from 'angular-notifier';
import {count} from 'rxjs/operators';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {ExceptionService} from '../../_services/exception.service';

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
    private events: any;
    public nbEventATraiter = 0;
    public nbEvent = 0;
    public noteDisabled;
    private notifier: NotifierService;


    constructor(
        private personneService: PersonneService,
        private route: ActivatedRoute,
        private filArianeService: FilArianeService,
        private router: Router,
        private cd: ChangeDetectorRef,
        private upsellLastEntity: UpsellLastEntitesService,
        private evenementService: EvenementService,
        private ngxService: NgxUiLoaderService,
        private exceptionService: ExceptionService,
        notifier: NotifierService
    ) {
        this.notifier = notifier;
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

    /* Récupère le libellé, pour construire le fil d'ariane */

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
                this.showNotification('error', this.exceptionService.statutErreur(err));
            }
        );
        this.countNbEventATraiter(uuid);
    }

    public showNotification(type: string, message: string): void {
        setTimeout(() => {
            this.notifier.notify(type, message);
        }, 1000);
    }

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
                data.map((item) => this.onglets.push(item));
            },
            err => {
                this.showNotification('error', this.exceptionService.statutErreur(err));
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

    creerEvenement(): void {
        this.router.navigate(['repertoire/creer/evenement/' + this.route.snapshot.params.id]);
    }

    countNbEventATraiter(uuid): void {
        this.evenementService.getListeEvenements(uuid).subscribe(
            events => {
                this.events = events;
                this.events.map(evts => {
                    this.nbEvent++;
                    if (evts.statut === 1) {
                        this.nbEventATraiter++;
                    }
                });
            }
        );
    }
}
