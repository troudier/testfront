import {Component, OnInit} from '@angular/core';
import {PersonneService} from '../../_services/personne.service';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {NotifierService} from 'angular-notifier';
import {ExceptionService} from '../../_services/exception.service';

@Component({
    selector: 'app-liste-cartes',
    templateUrl: './liste-cartes.component.html',
    styleUrls: ['./liste-cartes.component.scss']
})

export class ListeCartesComponent implements OnInit {

    errorMessage = '';
    personnes;
    offset = 0;
    limit = 20;
    recherche = '';
    statutFiltre = '';
    typeFiltre = '';
    private finListe = false;
    private rechercheEnCours = false;
    private notifier: NotifierService;

    constructor(
        private personneService: PersonneService,
        private exceptionService: ExceptionService,
        private ngxService: NgxUiLoaderService,
        notifier: NotifierService
    ) {
        this.notifier = notifier;
    }

    ngOnInit(): void {
        this.personneService.getPersonnesListe(
            this.offset.toString(),
            this.limit.toString(),
            this.recherche,
            this.typeFiltre,
            this.statutFiltre
        ).subscribe(
            data => {
                this.personnes = data;
            },
            err => {
                this.showNotification('error', this.exceptionService.statutErreur(err));
            }
        );
    }

    onScroll(): void {
        if (!this.rechercheEnCours && !this.finListe) {
            this.rechercheEnCours = true;
            this.offset = this.offset + this.limit;
            this.personneService.getPersonnesListe(
                this.offset.toString(),
                this.limit.toString(),
                this.recherche,
                this.typeFiltre,
                this.statutFiltre
            ).subscribe(data => {
                    this.finListe = data.length === 0;
                    data.map((item) => this.personnes.push(item));
                    this.rechercheEnCours = false;
                },
                err => {
                    this.errorMessage = err.error.message;
                    this.showNotification('error', this.errorMessage);
                }
            );
        }
    }

    onStatutFiltre(filtre): void {
        this.ngxService.start();
        this.statutFiltre = filtre.join(',');
        this.offset = 0;
        this.personneService.getPersonnesListe(
            this.offset.toString(),
            this.limit.toString(),
            this.recherche,
            this.typeFiltre,
            this.statutFiltre
        ).subscribe(data => {
                this.personnes = [];
                data.map((item) => this.personnes.push(item));
                this.ngxService.stop();
            },
            err => {
                this.errorMessage = err.error.message;
                this.ngxService.stop();
                this.showNotification('error', this.errorMessage);
            }
        );
    }

    onTypeFiltre(filtre): void {
        this.ngxService.start();
        this.typeFiltre = filtre.join(',');
        this.offset = 0;
        this.personneService.getPersonnesListe(
            this.offset.toString(),
            this.limit.toString(),
            this.recherche,
            this.typeFiltre,
            this.statutFiltre
        ).subscribe(data => {
                this.personnes = [];
                data.map((item) => this.personnes.push(item));
                this.offset = this.offset + this.limit;
                this.ngxService.stop();
            },
            err => {
                this.errorMessage = err.error.message;
                this.ngxService.stop();
                this.showNotification('error', this.errorMessage);
            }
        );
    }

    onRecherche(recherche): void {
        this.ngxService.start();
        this.recherche = recherche;
        this.offset = 0;
        this.personneService.getPersonnesListe(
            this.offset.toString(),
            this.limit.toString(),
            this.recherche,
            this.typeFiltre,
            this.statutFiltre
        ).subscribe(data => {
                this.personnes = [];
                data.map((item) => this.personnes.push(item));
                this.offset = this.offset + this.limit;
                this.ngxService.stop();
            },
            err => {
                this.errorMessage = err.error.message;
                this.ngxService.stop();
                this.showNotification('error', this.errorMessage);
            }
        );
    }

    public showNotification(type: string, message: string): void {
        setTimeout(() => {
            this.notifier.notify(type, message);
        }, 1000);
    }
}
