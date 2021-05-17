import {Component, OnInit} from '@angular/core';
import {PersonneService} from '../../_services/personne.service';

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
    constructor(
        private personneService: PersonneService
    ) {
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
                this.errorMessage = err.error.message;
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
                }
            );
        }
    }

    onStatutFiltre(filtre): void {
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
            },
            err => {
                this.errorMessage = err.error.message;
            }
        );
    }

    onTypeFiltre(filtre): void {
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
            },
            err => {
                this.errorMessage = err.error.message;
            }
        );
    }

    onRecherche(recherche): void {
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
            },
            err => {
                this.errorMessage = err.error.message;
            }
        );
    }
}
